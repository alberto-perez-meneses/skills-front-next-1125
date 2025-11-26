import { redirect } from "next/navigation";


interface Note {
    id: number
    owner: string
    title: string
    content: string
}

const NOTE_BASE_URL = process.env.NEXT_PUBLIC_NOTE_BASE_URL;
const NOTE_BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTE_BEARER_TOkEN;


export async function createPost(formData: FormData): Promise<void> {

    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    const newNote: Note = {
        id: 0,
        owner: "default",
        title,
        content
    };



    const response = await fetch("http://localhost:8080/api/notes?owner=alberto", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${NOTE_BEARER_TOKEN}`
        },
        body: JSON.stringify(newNote)
    }
    )

    if (!response.ok) {
        throw new Error("Failed to create note");
    }

    redirect("/");

}
