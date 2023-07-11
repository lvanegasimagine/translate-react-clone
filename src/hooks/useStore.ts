import { useReducer } from 'react'
import { type IState, type IAction, type FromLanguage, type Language } from '../types/types.d'
import { AUTO_LANGUAGE } from '../constants'

// * Create a initialState

const initialState: IState = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// * Create a reducer

function reducer(state: IState, action: IAction) {
    const loading = state.fromText !== ''

    switch (action.type) {
        case 'INTERCHANGE_LANGUAGES':
            if (state.fromLanguage === AUTO_LANGUAGE) return state
            return {
                ...state,
                loading,
                result: '',
                fromLanguage: state.toLanguage,
                toLanguage: state.fromLanguage
            }
        case 'SET_FROM_LANGUAGE':
            if (state.fromLanguage === action.payload) return state

            return {
                ...state,
                fromLanguage: action.payload,
                result: '',
                loading
            }
        case 'SET_TO_LANGUAGE':
            if (state.toLanguage === action.payload) return state
            return {
                ...state,
                toLanguage: action.payload,
                result: '',
                loading
            }
        case 'SET_FROM_TEXT':
            return {
                ...state,
                loading,
                fromText: action.payload,
                result: ''
            }
        case 'SET_RESULT':
            return {
                ...state,
                loading: false,
                result: action.payload
            }

        default: return state
    }
}

export function useStore() {
    const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => { dispatch({ type: 'INTERCHANGE_LANGUAGES' }) }

    const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }

    const setToLanguage = (payload: Language) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }

    const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload }) }

    const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    }
}