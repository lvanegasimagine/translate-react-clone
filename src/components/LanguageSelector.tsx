import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FC } from 'react'
import { SectionType, type FromLanguage, type Language } from '../types'

type Props =
    | { type: SectionType.FROM, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.TO, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }
    return (
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value} style={{ backgroundColor: '#FFEADD', color: '#1B6B93', fontWeight: 'bold' }}>
            {type === SectionType.FROM && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>{literal}</option>
            ))}
        </Form.Select>
    )
}