import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Container from '@material-ui/core/Container'
import Header from './components/Header/Header'
import Definitions from './components/Definitions/Definitions'

const styles = {
  backgroundColor: '#282c34',
  color: '#fff',
  height: '100vh'
}

const styles1 = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
}

function App () {
  const [word, setWord] = useState('')
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      )
      setMeanings(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(meanings)

  useEffect(() => {
    dictionaryApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, category])

  return (
    <div className='App' style={styles}>
      <Container maxWidth='md' style={styles1}>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
        />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} />
        )}
      </Container>
    </div>
  )
}

export default App
