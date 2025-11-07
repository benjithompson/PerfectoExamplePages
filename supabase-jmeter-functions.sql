-- JMeter Integration Functions for Supabase
-- Run this SQL in your Supabase SQL Editor to enable JMeter integration

-- Function to increment request count
-- This handles both INSERT (new parameter/value) and UPDATE (increment existing)
CREATE OR REPLACE FUNCTION increment_request_count(
  p_parameter_name TEXT,
  p_parameter_value TEXT
)
RETURNS void AS $$
BEGIN
  INSERT INTO request_counts (parameter_name, parameter_value, count, first_seen, last_seen)
  VALUES (p_parameter_name, p_parameter_value, 1, NOW(), NOW())
  ON CONFLICT (parameter_name, parameter_value)
  DO UPDATE SET
    count = request_counts.count + 1,
    last_seen = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment session count
-- This handles both INSERT (new session) and UPDATE (increment existing session)
CREATE OR REPLACE FUNCTION increment_session_count(
  p_session_id TEXT,
  p_user_agent TEXT DEFAULT 'Unknown'
)
RETURNS void AS $$
BEGIN
  INSERT INTO sessions (session_id, count, first_seen, last_seen, user_agent)
  VALUES (p_session_id, 1, NOW(), NOW(), p_user_agent)
  ON CONFLICT (session_id)
  DO UPDATE SET
    count = sessions.count + 1,
    last_seen = NOW(),
    user_agent = COALESCE(EXCLUDED.user_agent, sessions.user_agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ALL-IN-ONE FUNCTION: Track request with parameters in a single call
-- This increments the session count AND tracks all parameters
CREATE OR REPLACE FUNCTION track_request(
  p_session_id TEXT,
  p_user_agent TEXT DEFAULT 'Unknown',
  p_parameters JSONB DEFAULT '{}'::JSONB
)
RETURNS void AS $$
DECLARE
  param_key TEXT;
  param_value TEXT;
BEGIN
  -- First, increment session count
  INSERT INTO sessions (session_id, count, first_seen, last_seen, user_agent)
  VALUES (p_session_id, 1, NOW(), NOW(), p_user_agent)
  ON CONFLICT (session_id)
  DO UPDATE SET
    count = sessions.count + 1,
    last_seen = NOW(),
    user_agent = COALESCE(EXCLUDED.user_agent, sessions.user_agent);
  
  -- Then, loop through all parameters and track each one
  FOR param_key, param_value IN SELECT * FROM jsonb_each_text(p_parameters)
  LOOP
    INSERT INTO request_counts (parameter_name, parameter_value, count, first_seen, last_seen)
    VALUES (param_key, param_value, 1, NOW(), NOW())
    ON CONFLICT (parameter_name, parameter_value)
    DO UPDATE SET
      count = request_counts.count + 1,
      last_seen = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to anon role (public access)
GRANT EXECUTE ON FUNCTION increment_request_count(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION increment_session_count(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION track_request(TEXT, TEXT, JSONB) TO anon;

-- Verify functions were created
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE '%request%' OR routine_name LIKE '%session%'
ORDER BY routine_name;
