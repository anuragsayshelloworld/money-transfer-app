import { useState } from "react"

export default function Xyz(){
    
    const [text, setText] = useState('');
    const [allMessages, setAllMessages] = useState([])
    const [isTyping, setisTyping] = useState(false);
     
    function sendMessage(e){
        e.preventDefault();
        const newMessage = {
            text: text,
            isUser: true    
        }
    setAllMessages((prev) => [...prev, newMessage]);
    setisTyping(true);
    setText('');

    setTimeout(()=>{
      const aitext = {
        text: 'This is AI simulated message',
        isUser: false
      } 
      setAllMessages((prev)=>[...prev, aitext]);
      setisTyping(false);
    }, 3000)



    }
    return <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
            <div className="border border-gray-300 min-h-24 w-80 flex flex-col p-4 gap-3 shadow-sm bg-white rounded">
            <div className="text-center text-lg font-medium text-gray-800">My Chat App</div>
            <div className="bg-gray-100 h-32 rounded border p-2 text-sm text-gray-600 overflow-y-auto">
              {allMessages.map((item, index)=>{
                return <div key={index} className={`${item.isUser ? 'text-blue-700 text-right' : 'text-green-800 text-left'}`}>{item.text}</div>
              })}
              {isTyping && (
                <p>Typing...</p>
              )}      
          </div>
            <div className="flex gap-1">
                <form onSubmit={sendMessage}>
                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" className="border border-gray-300 flex-1 p-2 rounded text-sm" placeholder="Your message here"/>
                <button className="border border-gray-300 px-3 py-2 hover:bg-gray-100 transition-colors rounded text-sm">Send</button>
                </form>
            </div>    
        </div>
    </div>
}