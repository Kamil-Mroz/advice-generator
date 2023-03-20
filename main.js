import './style.css'
import axios from 'axios'

const adviceIdEl = document.getElementById('id')
const adviceQuoteEl = document.getElementById('quote')
const adviceBtnEl = document.getElementById('btn')

async function fetchAdvice() {
  try {
    const res = await axios.get('https://api.adviceslip.com/advice')
    const { id, advice } = res.data.slip
    adviceIdEl.textContent = id
    adviceQuoteEl.textContent = advice
  } catch (err) {
    throw new Error(err.message)
  }
}

function init() {
  fetchAdvice()
  adviceBtnEl.addEventListener('click', fetchAdvice)
}

init()
