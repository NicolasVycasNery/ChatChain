import { ChatMessage } from "./ChatMessage"
import { useEffect, useState } from "react"
import { get } from "../services/web3"

export function ChatHistory() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [messages, setMessages] = useState([])

    async function load() {
        const messagesData = await get(page, limit);
        console.log(messagesData);
        setMessages(messagesData);
    }

    useEffect(() => {
        load()
    }, [page, limit])


    return (
        <div className="flex flex-col border-2 border-gray-200 rounded-lg p-2 mb-7 mx-6 h-full overflow-y-scroll">
            {messages.map((message, index) => {
                const { text, sender, timestamp } = message;
                return (<ChatMessage
                    key={index}
                    text={text}
                    sender={sender}
                    timestamp={timestamp}
                />)
            })}
        </div>
    )
}