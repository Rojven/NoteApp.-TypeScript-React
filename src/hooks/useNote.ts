import { useOutletContext } from "react-router-dom";

import { Note } from "../types/types";


export const useNote = () => {
    return useOutletContext<Note>();
};