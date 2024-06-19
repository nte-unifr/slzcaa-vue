import pdfMake from 'pdfmake/build/pdfmake'
import { fonts } from './fonts.js'
import { i18n } from './i18n'

export default function downloadPdf(rows) {
  const docDefinition = {
    pageOrientation: 'landscape',
    defaultStyle: {
      fontSize: 9
    },
    content: [
      { text: 'This is a header', style: 'header' },
      {
        table: {
          body: [
            [
              i18n.global.t('table.title'),
              i18n.global.t('filter.target_levels'),
              i18n.global.t('filter.skills'),
              i18n.global.t('table.subject_areas'),
              i18n.global.t('filter.source_languages'),
              i18n.global.t('filter.media'),
              i18n.global.t('filter.year'),
              i18n.global.t('filter.modalities'),
              i18n.global.t('table.author'),
              'Code', // TODO
              i18n.global.t('table.loanable'),
              i18n.global.t('table.description')
            ],
            ...Array.from(rows).map((item) => {
              return [
                item.titel,
                item.sprachniveau,
                item.fertigkeit,
                item.fachbezug,
                item.ausgangssprache,
                item.medium,
                item.jahr,
                item.asl,
                item.autor,
                'TODO', // item.code,
                item.ausleihe_ble,
                item.kommentar
              ]
            })
          ]
        }
      }
    ]
  }
  pdfMake.fonts = fonts
  pdfMake.createPdf(docDefinition).open()
}
