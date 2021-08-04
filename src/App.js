import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Container from '@material-ui/core/Container'
import Header from './components/Header/Header'
import Definitions from './components/Definitions/Definitions'
import { Switch } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { grey, indigo } from '@material-ui/core/colors'

// const styles = {
//   backgroundColor: LightMode ? '#fff' : '#282c34',
//   color: LightMode ? 'black' : '#fff',
//   height: '100vh'
// }

// const styles1 = {
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100vh',
//   justifyContent: 'space-evenly'
// }

function App () {
  const [word, setWord] = useState('')
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')
  const [LightMode, setLightMode] = useState(false)

  const styles = {
    backgroundColor: LightMode ? '#fff' : '#282c34',
    color: LightMode ? 'black' : '#fff',
    height: '100vh',
    transition: 'all 0.5s linear'
  }
  const styles1 = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-evenly'
  }

  const ThemeSwitch = withStyles({
    switchBase: {
      color: indigo[100],
      '&$checked': {
        color: indigo[600]
      },
      '&$checked + $track': {
        backgroundColor: indigo[800]
      }
    },
    checked: {},
    track: {}
  })(Switch)

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
        <div
          style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightMode ? 'Dark' : 'Light'} Mode</span>
          <ThemeSwitch
            checked={LightMode}
            onChange={() => setLightMode(!LightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          LightMode={LightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            LightMode={LightMode}
          />
        )}
      </Container>
    </div>
  )
}

export default App
