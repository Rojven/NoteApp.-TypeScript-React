import Typography from '@mui/material/Typography';

import { NoteData, Tag } from '../types/types';

import NoteForm from './NoteForm';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <>
        <Typography 
          variant='h3' 
          component='h1'
        >
          New Note
        </Typography>
        <NoteForm 
          onSubmit={onSubmit} 
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
    </>
  )
}

export default NewNote;