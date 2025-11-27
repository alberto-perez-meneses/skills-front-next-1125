"use client";

import { useEffect, useState } from "react";
import  Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
  owner: string;
}

const NOTE_BASE_URL = process.env.NEXT_PUBLIC_NOTE_BASE_URL;
const NOTE_BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTE_BEARER_TOkEN;

export function NoteGrid() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNotes();
    } , []);


    const fetchNotes = async () => {
        try {
            const response = await fetch(`${NOTE_BASE_URL}/api/notes`,{
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${NOTE_BEARER_TOKEN}`
                }
            });
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setError("Failed to fetch notes.");
        }  
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">mis notas</h1>
            {
                notes.map((note) => (
                    <div key={note.id} className="border p-4 mb-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{note.title}</h2>
                        <p className="text-gray-700">{note.content}</p>
                        <Link href={`/notes/${note.id}`} className="text-blue-500 hover:underline">
                            View Details
                        </Link>
                        </div>
                ))
            }


            <Link href="/notes/new" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create New Note
            </Link>
            
        </div>
    );

}


