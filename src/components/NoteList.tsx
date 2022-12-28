import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Tag, SimplifiedNote } from '../types/types';

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type EditTagModalProps = {
    open: boolean
    availableTags: Tag[]
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

const NoteList = ({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps) => {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [editTagModalOpen, setEditTagModalOpen] = useState(false);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)));
        });
    }, [title, selectedTags, notes]);
    
    return (
        <>  
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography 
                    variant='h3' 
                    component='h1'
                >
                    Notes
                </Typography>
                <Stack
                    direction="row" 
                    flexWrap="wrap"
                    gap={2}
                >
                    <Link to="/new">
                        <Button 
                            variant="contained" 
                            type='button'
                        >
                        Create
                        </Button>
                    </Link>
                    <Button 
                        variant="outlined" 
                        type='button'
                        onClick={() => setEditTagModalOpen(true)}
                    >
                        Edit Tags
                    </Button>
                </Stack>
            </Stack>
            <Box 
                component="form"
                noValidate
                autoComplete="off"
                sx={{ my: '1rem' }}
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />  
                    <ReactSelect
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
            </Box>
            <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
            >
                {filteredNotes.map(note => {
                    return (
                        <NoteCard 
                            id={note.id}
                            title={note.title}
                            tags={note.tags} 
                            key={note.id}     
                        />
                    )
                })}
            </Stack>
            <EditTagModal 
                open={editTagModalOpen}
                availableTags={availableTags}
                handleClose={() => setEditTagModalOpen(false)}
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
            /> 
        </>
    );
};

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    return (
        <Card 
            sx={{ minWidth: 250 }}
            variant="outlined"
        >
            <CardContent>
                <Typography 
                    sx={{ fontSize: 14 }} 
                    color="text.secondary" 
                    gutterBottom
                >
                    {title}
                </Typography>
                {tags.length > 0 && (
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                    >
                        {tags.map(tag => {
                            return (
                                <Chip 
                                    key={tag.id}
                                    label={tag.label} 
                                    color="primary" 
                                    variant="outlined" 
                                />
                            )
                        })}
                    </Stack>
                )}
            </CardContent>
            <CardActions>
                <Link to={`/${id}`}>
                    <Button size="small">Read More</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

const EditTagModal = ({ availableTags, handleClose, open, onDeleteTag, onUpdateTag }: EditTagModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Tags</DialogTitle>
            <DialogContent>
                <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ my: '1rem' }}
                >   
                    <Stack gap={2}>   
                        {availableTags.map(tag => {
                            return (
                                <Stack
                                    direction="row" 
                                    gap={2}
                                    key={tag.id}
                                >
                                    <TextField
                                        id="outlined-required"
                                        label="Tag"
                                        sx={{ minWidth: '250px' }}
                                        size="small"
                                        value={tag.label}
                                        onChange={e => onUpdateTag(tag.id, e.target.value)}
                                    /> 
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={() => onDeleteTag(tag.id)}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            )
                        })}
                        
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NoteList;