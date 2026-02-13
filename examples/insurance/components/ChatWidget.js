/* ChatWidget Component – Sliding chat panel with FAQ and text input */
function ChatWidget({ isOpen, onClose }) {
  const [messages, setMessages] = React.useState([
    { id: 1, from: 'bot', text: 'Hi Elizabeth! 👋 How can I help you today? You can ask a question or choose from the topics below.' }
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  if (!isOpen) return null;

  const handleFaq = (faq) => {
    const userMsg = { id: Date.now(), from: 'user', text: faq.q };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: faq.a }]);
    }, 1000 + Math.random() * 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const match = CHAT_FAQ.find(f => input.toLowerCase().includes(f.q.toLowerCase().split(' ').slice(2,4).join(' ')));
      const response = match
        ? match.a
        : "Thanks for your question! For specific account inquiries, I'd recommend speaking with a specialist. You can call us at 1-800-555-0199 (available 24/7) or visit your nearest SecureShield office. Is there anything else I can help with?";
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: response }]);
    }, 1200 + Math.random() * 800);
  };

  const showFaqButtons = messages.length <= 2;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">SS</div>
          <div>
            <div className="chat-agent-name">SecureShield Assistant</div>
            <div className="chat-status">● Online</div>
          </div>
        </div>
        <button className="chat-close" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={'chat-msg ' + msg.from}>
            {msg.from === 'bot' && <div className="chat-msg-avatar">SS</div>}
            <div className="chat-msg-bubble">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg bot">
            <div className="chat-msg-avatar">SS</div>
            <div className="chat-msg-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showFaqButtons && (
        <div className="chat-faq-list">
          {CHAT_FAQ.slice(0, 4).map((faq, i) => (
            <button key={i} className="chat-faq-btn" onClick={() => handleFaq(faq)}>{faq.q}</button>
          ))}
        </div>
      )}

      <div className="chat-input-bar">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()}>➤</button>
      </div>
    </div>
  );
}
