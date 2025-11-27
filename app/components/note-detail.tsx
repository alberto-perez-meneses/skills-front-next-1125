"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Note {
  id: number
  owner: string
  title: string
  content: string
}

interface NoteDetailProps {
  noteId: string
}

const NOTE_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_NOTE_BASE_URL || "http://localhost:8080";
const NOTE_SERVICE_BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTE_BEARER_TOkEN || "your-default-token-here";


export function NoteDetail({ noteId }: NoteDetailProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    fetchNote()
  }, [noteId])

  const fetchNote = async () => {
    try {
      setLoading(true)
      const response = await fetch(NOTE_SERVICE_BASE_URL+`/api/notes/${noteId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${NOTE_SERVICE_BEARER_TOKEN}`
        },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch note")
      }
      const data = await response.json()
      setNote(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const response = await fetch(NOTE_SERVICE_BASE_URL+`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${NOTE_SERVICE_BEARER_TOKEN}`
        },
      })
      if (!response.ok) {
        throw new Error("Failed to delete note")
      }
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note")
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        cargando...
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error: {error || "Note not found"}</p>
          <Link href="/">
            Back to Notes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">                
                All Notes              
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={handleDelete} >
                  Delete
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{note.title}</h1>         
          <div className="prose prose-invert max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">{note.content}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
