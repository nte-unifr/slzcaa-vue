import pdfMake from 'pdfmake/build/pdfmake'
import { fmtCode, fmtLanguage, fmtSplitAndLower, fmtSubject } from './helper.js'
import { fonts } from './fonts.js'
import { i18n } from './i18n'

export default function downloadPdf(rows) {
  const docDefinition = {
    pageOrientation: 'landscape',
    defaultStyle: {
      fontSize: 9
    },
    header: {
      stack: [{ text: i18n.global.t('pdf.title'), alignment: 'center' }]
    },
    footer: function (currentPage, pageCount) {
      return [{ text: `${currentPage} / ${pageCount}`, alignment: 'center' }]
    },
    content: [
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
              'Code',
              i18n.global.t('table.description')
            ],
            ...Array.from(rows).map((item) => {
              return [
                item.titel,
                item.sprachniveau,
                fmtSplitAndLower(item.fertigkeit),
                fmtSubject(item.fachbezug),
                fmtLanguage(item.ausgangssprache),
                fmtSplitAndLower(item.medium),
                item.jahr,
                fmtSplitAndLower(item.asl),
                item.autor,
                fmtCode(item),
                item.kommentar
              ]
            })
          ]
        }
      }
    ]
  }
  pdfMake.fonts = fonts
  pdfMake.createPdf(docDefinition).download(i18n.global.t('pdf.filename'))
}
