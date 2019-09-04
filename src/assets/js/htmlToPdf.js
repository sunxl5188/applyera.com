import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install (Vue) {
    Vue.prototype.downLoadPdf = function (filename, pdfDom) {
      html2Canvas(document.querySelector(pdfDom), {
        width: 820,
        imageTimeout: 0,
        allowTaint: true,
        removeContainer: false,
        backgroundColor: '#ffffff'
      }).then(function (canvas) {
        // $("body").append(canvas)
        // $("body > canvas").wrap("<div style='text-align: center;background: #000000;'>")
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('p', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(filename + '.pdf')
      }
      )
    }
  }
}
