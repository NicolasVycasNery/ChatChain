import { ChatHistory } from '../ChatHistory';
import { ChatInput } from '../ChatInput';

export function ChatPage() {
    return (
        <section className="flex flex-col justify-between h-[80vh] p-4">
            <ChatHistory />
            <ChatInput />
        </section>
    )
}