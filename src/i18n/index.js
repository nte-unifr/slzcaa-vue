import { createI18n } from 'vue-i18n'
import columnsDe from '../ressources/columns_de.json'
import columnsEn from '../ressources/columns_en.json'
import columnsFr from '../ressources/columns_fr.json'
import languagesDe from '../ressources/languages_de.json'
import languagesEn from '../ressources/languages_en.json'
import languagesFr from '../ressources/languages_fr.json'
import langSrcDe from '../ressources/label_lang_de.json'
import langSrcEn from '../ressources/label_lang_en.json'
import langSrcFr from '../ressources/label_lang_fr.json'
import levelsDe from '../ressources/levels_de.json'
import levelsEn from '../ressources/levels_en.json'
import levelsFr from '../ressources/levels_fr.json'
import mediaDe from '../ressources/media_de.json'
import mediaEn from '../ressources/media_en.json'
import mediaFr from '../ressources/media_fr.json'
import modalitiesDe from '../ressources/modalities_de.json'
import modalitiesEn from '../ressources/modalities_en.json'
import modalitiesFr from '../ressources/modalities_fr.json'
import skillsDe from '../ressources/skills_de.json'
import skillsEn from '../ressources/skills_en.json'
import skillsFr from '../ressources/skills_fr.json'
import subjectsDe from '../ressources/subjects_de.json'
import subjectsEn from '../ressources/subjects_en.json'
import subjectsFr from '../ressources/subjects_fr.json'
import subjectsEverydayDe from '../ressources/label_subjects_everyday_de.json'
import subjectsEverydayEn from '../ressources/label_subjects_everyday_en.json'
import subjectsEverydayFr from '../ressources/label_subjects_everyday_fr.json'
import subjectsProDe from '../ressources/label_subjects_pro_de.json'
import subjectsProEn from '../ressources/label_subjects_pro_en.json'
import subjectsProFr from '../ressources/label_subjects_pro_fr.json'
import translationDe from '../i18n/translation_de.json'
import translationEn from '../i18n/translation_en.json'
import translationFr from '../i18n/translation_fr.json'

const locale = localStorage.getItem('locale')
const langAvailable = ['de', 'en', 'fr']
const preferred = navigator.languages.find((l) => langAvailable.includes(l))

export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: locale || preferred || 'de',
  fallbackLocale: 'en',
  messages: {
    de: {
      ...columnsDe,
      ...languagesDe,
      ...langSrcDe,
      ...levelsDe,
      ...mediaDe,
      ...modalitiesDe,
      ...skillsDe,
      ...subjectsDe,
      ...subjectsEverydayDe,
      ...subjectsProDe,
      ...translationDe
    },
    en: {
      ...columnsEn,
      ...languagesEn,
      ...langSrcEn,
      ...levelsEn,
      ...mediaEn,
      ...modalitiesEn,
      ...skillsEn,
      ...subjectsEn,
      ...subjectsEverydayEn,
      ...subjectsProEn,
      ...translationEn
    },
    fr: {
      ...columnsFr,
      ...languagesFr,
      ...langSrcFr,
      ...levelsFr,
      ...mediaFr,
      ...modalitiesFr,
      ...skillsFr,
      ...subjectsFr,
      ...subjectsEverydayFr,
      ...subjectsProFr,
      ...translationFr
    }
  }
})
