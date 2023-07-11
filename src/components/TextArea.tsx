import { Form } from 'react-bootstrap'
import { SectionType } from '../types'

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles: any = { borderStyle: 'dotted', height: '280px', resize: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.FROM) return 'Escribe texto'
    if (loading === true) return 'Traduciendo...'

    return 'Tradución'
}

export const TextArea = ({ type, loading, onChange, value }: Props) => {
    const styles = type === SectionType.FROM ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as="textarea"
            autoFocus={type === SectionType.FROM}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            disabled={type === SectionType.TO}
            onChange={handleChange}
        />
    )
}