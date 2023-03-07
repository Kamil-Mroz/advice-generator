import './style.css'
import axios from 'axios'

const adviceIdEl = document.getElementById('id')
const adviceQuoteEl = document.getElementById('quote')
const adviceBtnEl = document.getElementById('btn')

async function setAdvice() {
  const data = await fetchAdvice()
  adviceIdEl.textContent = data.id
  adviceQuoteEl.textContent = data.advice
  console.log('ok')
}

async function fetchAdvice() {
  try {
    const { data } = await axios.get('https://api.adviceslip.com/advice')
    return data.slip
  } catch (err) {
    throw new Error(err.message)
  }
}

async function init() {
  setAdvice()
  adviceBtnEl.addEventListener('click', setAdvice)
}

window.addEventListener('DOMContentLoaded', init)
