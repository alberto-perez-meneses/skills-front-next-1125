import { NoteDetail } from "@/app/components/note-detail"

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <NoteDetail noteId={id} />
}
