"use client";

import { useForm } from "react-hook-form";

export default function TicketForm({ defaultValues = {}, onSubmit }) {
    const { register, handleSubmit } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4">
            <input {...register("title")} placeholder="Title" className="w-full border p-2 rounded" />
            <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded" />
            <select {...register("status")} className="w-full border p-2 rounded">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
            <select {...register("priority")} className="w-full border p-2 rounded">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
    );
}
