'use client';
import Link from "next/link";
import { createPost } from "@/app/lib/actions";


export default function NoteForm() {
    return (    
         <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
               Notas
            </Link>
            <span>/</span>
            <span className="text-foreground">Nueva Nota</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl text-foreground mb-8">Crear nota</h1>
          <form action={createPost}>
            <div className=" border border-border rounded-lg p-1 ">
              <div className="space-y-6">
                <div className="space-y-2">
                  <input type="text" name="title" className="resize-none bg-secondary/50 border-border focus:border-blue-600/50" placeholder="Escribre el titulo." />
                </div>
              </div>
            </div>
            <br />

            <div className=" border border-border rounded-lg p-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <input type="text" name="content" className="resize-none bg-secondary/50 border-border focus:border-blue-600/50" placeholder="Escribre el contenido" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Crear</button>
              </div>
            </div>

          </form>
        </div>
      </main>
    </div>
    );
}