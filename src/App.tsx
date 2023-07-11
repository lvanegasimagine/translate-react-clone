import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const { loading, fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromText, setResult, setFromLanguage, setToLanguage } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText }).then(result => {
      if (result == null) return
      setResult(result)
    }).catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2 style={{ display: 'flex', marginLeft: '55px', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>Google Translate By React And ChatGPT</h2>
      <Row style={{ width: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='seccion'>
        <Col xs={12} sm={6} md={4}>
          <Stack gap={3}>
            <LanguageSelector type={SectionType.FROM} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea type={SectionType.FROM} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>
        <Col xs="auto" sm={'auto'} md={'auto'}>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}><ArrowsIcon /></Button>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Stack gap={3}>
            <LanguageSelector type={SectionType.TO} value={toLanguage} onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea type={SectionType.TO} value={result} onChange={setResult} loading={loading} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button variant='link' onClick={handleClipboard}><ClipboardIcon /> </Button>
                <Button variant='link' onClick={handleSpeak}><SpeakerIcon /> </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
