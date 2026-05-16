import React, { useState, useRef, useEffect } from 'react';

const ATLAS_SYSTEM = `You are Atlas — the Abroadly AI Study Advisor. You are a friendly, intelligent counsellor helping Indian students (especially from South India/Tamil Nadu) find the perfect course and university in Malaysia, primarily at Asia Pacific University (APU).

YOUR GOAL: Guide the student to the right course by asking about their qualification, interests, goals, and budget — one question at a time.

COURSE DATA (APU Malaysia — International Fees):
- Certificate: RM 22,400 | 1.2 years | Business, Computing & IT
- Foundation: RM 21,200–29,200 | 1 year | Business, Computing, Engineering
- Diploma: RM 54,200 | 2 years | Computing, Business, Accounting, Engineering, Media, Hospitality
- Bachelor (3yr): RM 108,500 | Computing & IT, Business, Accounting, Media, Design, Architecture, Psychology
- Bachelor (4yr Engineering): RM 137,200 | Electrical, Mechatronic, Mechanical, Computer, Petroleum Engineering
- Master (1yr): RM 38,800–40,800 | AI, Cyber Security, Data Science, Software Eng, MBA, Digital Transformation
- Master (ODL): RM 31,000–34,500 | MBA, AI, Cyber Security, Data Science (flexible/online)

TOTAL COST = Tuition + RM 5,000 (app fee) + RM 500 (deposit) + RM 5,400 (visa)
Example: Bachelor = ~RM 119,400 = ~₹21–22 Lakhs

ENTRY PATHWAY:
- 10th completed → Certificate or Foundation
- 12th completed → Foundation or Diploma or Bachelor (based on scores)
- Diploma/Polytechnic → Direct Bachelor Year 2 entry possible
- Bachelor's degree → Master programmes
- Master's degree → Direct to Abroadly counsellor for PhD options

MALAYSIA BENEFITS TO MENTION WHEN RELEVANT:
- Affordable vs UK/Canada/Australia
- English medium, multicultural, large Indian/Tamil community
- PR pathway after graduation + work experience
- 3.5hr flight from India
- APU is QS-ranked

RULES:
- Keep replies under 120 words
- Never ask more than one question at a time
- Never fabricate course names or fees not listed above
- Never promise scholarships, visa approval, or PR — say "subject to eligibility"
- Always end with a follow-up question OR a CTA to contact Abroadly
- If asked about scholarships, accommodation, intake dates, visa timelines, documents — say: "Our Abroadly counsellors can help with this personally — it's free! Reach out via WhatsApp."

TONE: Warm, casual, like a helpful friend. Match the student's energy.`;

export default function AtlasChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setShowChips(false);
    setIsLoading(true);

    try {
      // NOTE: In a real production app, this fetch should be routed through your backend 
      // to avoid exposing your Anthropic API key in the frontend.
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY_HERE', // Add your actual API key here or proxy through backend
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true' // Required for client-side fetch
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 500,
          system: ATLAS_SYSTEM,
          messages: [...messages, userMsg]
        })
      });
      
      const data = await res.json();
      const replyText = data.content?.find(b => b.type === 'text')?.text || "Let me connect you with our Abroadly counsellors for this one!";
      
      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Something went wrong on my end. Try again in a moment! 🙏" }]);
    }

    setIsLoading(false);
  };

  return (
    <>
      <style>{`
        @keyframes ab {
          0%, 60%, 100% { transform: translateY(0); opacity: .4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>

      {/* Floating Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '16px',
          width: '52px',
          height: '52px',
          background: '#1D9E75',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          zIndex: 9999,
          transition: 'transform 0.2s, box-shadow 0.2s',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
        }}
        onMouseOver={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
          }
        }}
        onMouseOut={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.2)';
          }
        }}
      >
        {/* Atlas Icon — Graduation Cap / AI Star */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Tooltip Label */}
      <div style={{
        position: 'fixed',
        bottom: '103px',
        right: '76px',
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '12px',
        fontWeight: '500',
        padding: '5px 11px',
        borderRadius: '6px',
        zIndex: 9999,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        fontFamily: "'Inter', sans-serif",
        opacity: isOpen ? '0' : '1',
        transition: 'opacity 0.3s',
      }}>
        Ask Atlas AI ✦
      </div>

      {/* Chat Widget Panel */}
      <div style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '360px',
        height: '520px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        zIndex: 9998,
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}>

        {/* Header */}
        <div style={{ background: '#1D9E75', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff', fontWeight: '700' }}>A</div>
            <div>
              <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Atlas</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', background: '#7FE8C0', borderRadius: '50%', display: 'inline-block' }}></span>
                AI Study Advisor · Abroadly
              </div>
            </div>
          </div>
          <span onClick={() => setIsOpen(false)} style={{ color: '#fff', cursor: 'pointer', fontSize: '20px', lineHeight: '1', opacity: '0.8' }}>✕</span>
        </div>

        {/* Messages */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f9fafb' }}>

          {/* Opening message */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ width: '28px', height: '28px', background: '#1D9E75', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>A</div>
            <div style={{ background: '#fff', borderRadius: '12px', borderBottomLeftRadius: '3px', padding: '10px 13px', fontSize: '13px', color: '#1a1a1a', lineHeight: '1.5', maxWidth: '85%', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              Hi! I'm <strong>Atlas</strong> 🌍 — your personal AI study advisor from Abroadly. I'm here to help you find the perfect course and university in Malaysia.<br/><br/>Where would you like to start — exploring options, or do you have a course in mind?
            </div>
          </div>

          {/* Quick chips */}
          {showChips && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '36px' }}>
              <button onClick={() => handleSend('I want to study in Malaysia')} style={{ background: '#E1F5EE', border: '1px solid #5DCAA5', borderRadius: '20px', padding: '5px 11px', fontSize: '11px', color: '#0F6E56', cursor: 'pointer', fontFamily: 'inherit' }}>🇲🇾 Study in Malaysia</button>
              <button onClick={() => handleSend('What courses are available?')} style={{ background: '#E1F5EE', border: '1px solid #5DCAA5', borderRadius: '20px', padding: '5px 11px', fontSize: '11px', color: '#0F6E56', cursor: 'pointer', fontFamily: 'inherit' }}>📚 Browse courses</button>
              <button onClick={() => handleSend('How much does it cost to study in Malaysia?')} style={{ background: '#E1F5EE', border: '1px solid #5DCAA5', borderRadius: '20px', padding: '5px 11px', fontSize: '11px', color: '#0F6E56', cursor: 'pointer', fontFamily: 'inherit' }}>💰 Fee structure</button>
            </div>
          )}

          {/* Chat History */}
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-start' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: '28px', height: '28px', background: '#1D9E75', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>A</div>
              )}
              <div style={{
                background: msg.role === 'user' ? '#1D9E75' : '#fff',
                color: msg.role === 'user' ? '#fff' : '#1a1a1a',
                borderRadius: '12px',
                borderBottomRightRadius: msg.role === 'user' ? '3px' : '12px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '3px' : '12px',
                padding: '10px 13px',
                fontSize: '13px',
                maxWidth: '80%',
                lineHeight: '1.5',
                boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.07)' : 'none',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', background: '#1D9E75', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>A</div>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', background: '#1D9E75', borderRadius: '50%', animation: 'ab 1.2s infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', background: '#1D9E75', borderRadius: '50%', animation: 'ab 1.2s 0.2s infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', background: '#1D9E75', borderRadius: '50%', animation: 'ab 1.2s 0.4s infinite' }}></span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #eee', display: 'flex', gap: '8px', background: '#fff' }}>
          <input
            type="text"
            placeholder="Ask Atlas anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputValue);
            }}
            style={{ flex: 1, height: '38px', border: '1px solid #ddd', borderRadius: '8px', padding: '0 12px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', color: '#1a1a1a' }}
          />
          <button 
            onClick={() => handleSend(inputValue)}
            style={{ width: '38px', height: '38px', background: '#1D9E75', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
