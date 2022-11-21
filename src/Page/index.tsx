// Explicação da Lógica no arquivo MD dentro da pasta Explicação.

import axios from 'axios'
import react, { useCallback, useEffect, useState } from 'react'
import { Button } from '../components/Button/Button'
import '../styles/Home-style.scss'

import { Display } from '../components/Display/Display'

export function Home() {
  const [apiNumber, setApiNumber] = useState(0)
  const [userNumber, setUserNumber] = useState('')
  const [verification, setVerification] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [hasError, setHasError] = useState(false)

  const compare = useCallback(() => {
    const parsedValue = Number(userNumber)
    if (!userNumber || isNaN(parsedValue)) return
    if (apiNumber === parsedValue) {
      setVerification('Parabéns! Você acertou!')
      setIsFinished(true)
    } else if (apiNumber > parsedValue) {
      setVerification('Quase lá, o número é maior!')
    } else {
      setVerification('Quase lá, o número é menor!')
    }
  }, [apiNumber, userNumber])

  const updateGuess = useCallback(
    (event: react.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = Number(event.target.value)
      if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 300) return
      setUserNumber(event.target.value)
    },
    []
  )

  async function getNumber() {
    try {
      const response = await axios.get(
        'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300'
      )
      setApiNumber(response.data.value)
      setIsFinished(false)
      setUserNumber('')
      setHasError(false)
      setVerification('')
    } catch (error: any) {
      const userError = error.toJSON()
      setUserNumber(userError.status.toString())
      setVerification('ERRO')
      setIsFinished(true)
      setHasError(true)
    }
  }

  useEffect(() => {
    getNumber()
  }, [])

  // console.log(apiNumber) - Para conferir o número enviado pela API

  return (
    <div>
      <div className="title">
        <h1>Qual é o número?</h1>
      </div>
      <div className="divider"></div>

      <div className="frame">
        <div className="container">
          <p className={isFinished ? (hasError ? 'error' : 'success') : ''}>
            {verification}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {userNumber[0] && (
              <Display
                digit={Number(userNumber[0])}
                color={isFinished ? (hasError ? '#CC3300' : '#32BF00') : ''}
              />
            )}
            {userNumber[1] && (
              <Display
                digit={Number(userNumber[1])}
                color={isFinished ? (hasError ? '#CC3300' : '#32BF00') : ''}
              />
            )}
            {userNumber[2] && (
              <Display
                digit={Number(userNumber[2])}
                color={isFinished ? (hasError ? '#CC3300' : '#32BF00') : ''}
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-user">
        {!hasError && (
          <div>
            <input
              name="guess"
              id="guess"
              max="300"
              min="0"
              placeholder="Digite o seu palpite"
              onChange={updateGuess}
              value={userNumber}
            />
          </div>
        )}

        {isFinished && (
          <div className="button-error">
            <Button type="submit" onClick={getNumber}>
              NOVA PARTIDA
            </Button>
          </div>
        )}

        <Button type="submit" onClick={compare} disabled={isFinished}>
          ENVIAR
        </Button>
      </div>
    </div>
  )
}
