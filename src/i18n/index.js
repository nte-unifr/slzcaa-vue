import { createI18n } from 'vue-i18n'
import translationDe from '../i18n/translation_de.json'
import translationEn from '../i18n/translation_en.json'
import translationFr from '../i18n/translation_fr.json'

const locale = localStorage.getItem('locale')
const langAvailable = ['de', 'en', 'fr']
const preferred = navigator.languages.find((l) => langAvailable.includes(l))

export const i18n = createI18n({
  locale: locale || preferred || 'de',
  fallbackLocale: 'en',
  messages: {
    de: { ...translationDe },
    en: { ...translationEn },
    fr: { ...translationFr }
  }
})
