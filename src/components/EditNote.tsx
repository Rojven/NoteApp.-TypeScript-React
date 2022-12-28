import Typography from '@mui/material/Typography';

import { NoteData, Tag } from '../types/types';

import { useNote } from '../hooks';

import NoteForm from './NoteForm';

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    
    const note = useNote();

    return (
        <>
            <Typography 
                variant='h3' 
                component='h1'
            >
                Edit Note
            </Typography>
            <NoteForm 
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data => onSubmit(note.id, data)} 
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    );
};

export default NewNote;