/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config';
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {

        checkCancelBeforeDispatch({
            type: 'LOADING'
        });

        try{

            const newDocument = {...document, createAt: Timestamp.now()};

            // procura no banco de dados a coleção que foi passada como parametro (posts) -> se encontra adiciona o novo documento (newDocument)
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            checkCancelBeforeDispatch({
                type:'INSERTED_DOC',
                payload: insertedDocument
            });

        } catch (error) {

            checkCancelBeforeDispatch({
                type:'ERROR',
                payload: error.message
            });

        }
    }

    // Isso é utilizado para quando o componente é desmontado para não deixar que mude o estado da hook após o desmanche
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {insertDocument, response}
}

