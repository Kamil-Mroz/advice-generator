import './style.css'
import axios from 'axios'
import DesktopSeparator from './images/pattern-divider-desktop.svg'
import MobileSeparator from './images/pattern-divider-mobile.svg'
import Dice from './images/icon-dice.svg'
const app = document.getElementById('app')

class Advice {
  constructor(adviceId, adviceQuote, parent = app) {
    this.adviceId = adviceId
    this.adviceQuote = adviceQuote
    this.parent = parent
    this.createAdvice.bind(this)
  }

  createAdvice() {
    const containerEl = document.createElement('div')
    containerEl.classList.add('advice-container')

    const adviceIdEl = document.createElement('p')
    adviceIdEl.classList.add('advice-id')
    adviceIdEl.textContent = 'advice'

    const spanIdEl = document.createElement('span')
    spanIdEl.textContent = `#${this.adviceId}`
    adviceIdEl.append(spanIdEl)

    const adviceQuoteEl = document.createElement('p')
    const quotes = document.createElement('q')
    quotes.classList.add('advice-quote')
    quotes.textContent = this.adviceQuote
    adviceQuoteEl.append(quotes)

    const picture = document.createElement('picture')
    const source = document.createElement('source')
    source.srcset = DesktopSeparator
    source.media = '(min-width:1024px)'

    const separator = document.createElement('img')
    separator.src = MobileSeparator
    picture.append(source, separator)

    const btn = document.createElement('button')
    btn.classList.add('advice-btn')
    btn.addEventListener('click', () => this.newAdvice())

    const diceIcon = document.createElement('img')
    diceIcon.src = Dice
    diceIcon.alt = 'dice'
    btn.append(diceIcon)

    containerEl.append(adviceIdEl, adviceQuoteEl, picture, btn)

    this.parent.append(containerEl)
  }
  deleteAdvice() {
    this.parent.innerHTML = ''
    delete this
  }

  async newAdvice() {
    this.deleteAdvice()
    const { slip: data } = await fetchAdvice()
    const advice = new Advice(data.id, data.advice)
    advice.createAdvice()
  }
}

async function fetchAdvice() {
  try {
    const { data } = await axios.get('https://api.adviceslip.com/advice')
    return data
  } catch (err) {
    console.error(err)
  }
}

async function init() {
  const { slip: data } = await fetchAdvice()

  const advice = new Advice(data.id, data.advice)
  advice.createAdvice()
}

window.addEventListener('DOMContentLoaded', init)
