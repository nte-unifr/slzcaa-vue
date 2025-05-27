import { i18n } from './i18n'
import languagesDe from './ressources/languages_de.json'
import subjectsDe from './ressources/subjects_de.json'

const languageLookup = new Map()
Object.entries(languagesDe).forEach((r) => {
  const k = r[0]
  const v = r[1]
  languageLookup.set(v, k)
})

const subjectLookup = new Map()
Object.entries(subjectsDe).forEach((r) => {
  const k = r[0]
  const v = r[1]
  subjectLookup.set(v, k)
})

export function fmtBoolean(bool) {
  const yesNo = bool ? 'yes' : 'no'
  return i18n.global.t(`filter.${yesNo}`)
}

export function fmtCode(row) {
  return [row.bereich, row.spr, row.sb, row.sm2].filter((element) => element).join(' | ')
}

export function fmtLanguage(langInGerman) {
  if (!languageLookup.has(langInGerman)) {
    return langInGerman
  }
  const key = languageLookup.get(langInGerman)
  return i18n.global.t(key)
}

export function fmtSplitAndLower(text) {
  if (text) {
    return text
      .split(' ')
      .map((e) => i18n.global.t(e.toLowerCase()))
      .join(', ')
  }
  return ''
}

export function fmtSubject(langInGerman) {
  if (langInGerman === null) {
    return ''
  }
  if (!subjectLookup.has(langInGerman)) {
    return langInGerman
  }
  const key = subjectLookup.get(langInGerman)
  return i18n.global.t(key)
}
