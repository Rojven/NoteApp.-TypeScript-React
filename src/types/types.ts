export type Tag = {
    label: string
    id: string
}

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Note = {
    id: string
} & NoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type RawNote = {
    id: string 
} & RawNoteData

export type SimplifiedNote = {
    title: string
    id: string
    tags: Tag[]
}