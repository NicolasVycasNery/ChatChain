import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { send } from '../services/web3'

export function ChatInput() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            message: ""
        }
    })

    const onSubmit = async (data) => {
        const { message } = data
        try {
            console.log(`Sending message: ${message}`)
            await send(message)
            reset()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // register an event listener to the enter key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                handleSubmit(onSubmit)()
            }
        })
        return () => {
            document.removeEventListener("keydown", () => { })
        }
    }, [])

    return (
        <section className="flex flex-col justify-end mx-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    errors.message && <span className="text-red-500">Message can not be empty</span>
                }
                <input
                    className="border-2 border-gray-200 rounded-lg p-2 bg-gray-700 text-white w-full"
                    type="text"
                    placeholder="Enter your message..."
                    {...register("message", { required: true })}
                />
            </form>
        </section>
    )
}