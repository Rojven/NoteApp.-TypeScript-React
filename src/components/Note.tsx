import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { useNote } from '../hooks';

type NoteProps = {
    onDelete: (id: string) => void
}

const Note = ({ onDelete }: NoteProps) => {

    const note = useNote();
    const navigate = useNavigate();

    return (
        <>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
            >
                <Stack gap={2}>
                    <Typography 
                        variant='h3' 
                        component='h1'
                    >
                        {note.title}
                    </Typography>
                    {note.tags.length > 0 && (
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={1}
                        >
                            {note.tags.map(tag => {
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
                </Stack>
                <Stack
                   direction="row"
                   flexWrap="wrap"
                   gap={2} 
                >   
                    <Link to={`/${note.id}/edit`}>
                        <Button 
                            variant="contained" 
                            type='button'
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button 
                        variant="outlined" 
                        type='button'
                        color="error"
                        onClick={() => {
                            onDelete(note.id);
                            navigate("/");
                        }}
                    >
                        Delete
                    </Button>
                    <Link to="..">
                        <Button 
                            variant="outlined" 
                            type='button'
                        >
                            Back
                        </Button>
                    </Link>
                </Stack>
            </Stack>  
            <ReactMarkdown children={note.markdown} />
        </>
    );
};

export default Note;