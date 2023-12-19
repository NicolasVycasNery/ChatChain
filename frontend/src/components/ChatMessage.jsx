export function ChatMessage({
    text,
    sender,
    timestamp,
}) {
    const addr = window.ethereum.selectedAddress;
    return (
        <div className='bg-gray-100 p-2 rounded-lg mb-2'>
            <p className={
                `text-sm text-gray-600 ${addr === sender ? 'text-right' : 'text-left'
                }`}>
                <span className='font-bold text-sky-600'>
                    {sender}
                </span>
            </p>
            <p className='text-gray-900'>{text}</p>
            <p className='text-xs text-gray-500'>{timestamp.toString()}</p>
            <hr className='my-2' />
        </div>
    )
}
