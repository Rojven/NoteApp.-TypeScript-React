import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import CreatableReactSelect from 'react-select/creatable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { NoteData, Tag } from '../types/types';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({ onSubmit, onAddTag, availableTags, title="", markdown="", tags=[] }: NoteFormProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags    
        })

        navigate('..');
    };

    return (
        <Box 
            component="form"
            autoComplete="off"
            sx={{ mt: '1rem' }}
            onSubmit={handleSubmit}
        >   
            <Stack
                direction="row" 
                flexWrap="wrap"
                gap={2}
            >
                <TextField
                    id="title"
                    label="Title"
                    sx={{ minWidth: '250px' }}
                    size="small"
                    ref={titleRef}
                    required
                    defaultValue={title}
                    
                />  
                <CreatableReactSelect
                    id='tags'
                    isMulti
                    placeholder="Tags"
                    styles={{
                        control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '250px',
                        minHeight: '40px'
                        }),
                    }}
                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label };
                        onAddTag(newTag);
                        setSelectedTags(prev => [...prev, newTag]);
                    }}
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                    })}
                    options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value }
                        }))
                    }}
                />
            </Stack>
            <TextField
                id="markdown"
                label="Body"
                multiline
                rows={15}
                sx={{mt: '1rem'}}
                fullWidth
                ref={markdownRef}
                required
                defaultValue={markdown}
            />
            <Stack
                direction="row" 
                flexWrap="wrap"
                gap={2}
                marginTop="1rem"
            >
                <Button 
                    variant="contained" 
                    type='submit'
                >
                    Save
                </Button>
                <Link to="..">
                    <Button 
                        variant="outlined" 
                        type='button'
                    >
                        Cancel
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
};

export default NoteForm;