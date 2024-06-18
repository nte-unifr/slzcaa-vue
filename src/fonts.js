// https://github.com/bpampuch/pdfmake/issues/2654#issuecomment-1832840222

const url = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto'

export const fonts = {
  Roboto: {
    normal: `${url}/Roboto-Regular.ttf`,
    bold: `${url}/Roboto-Medium.ttf`,
    italics: `${url}/Roboto-Italic.ttf`,
    bolditalics: `${url}/Roboto-MediumItalic.ttf`
  }
}
