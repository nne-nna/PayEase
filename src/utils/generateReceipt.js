import jsPDF from 'jspdf'

export const generateReceipt = (transaction) => {
  const doc = new jsPDF()

  let details = {}
  try {
    details = transaction.details ? JSON.parse(transaction.details) : {}
  } catch {
    details = {}
  }

  // Header
  doc.setFillColor(22, 163, 74)
  doc.rect(0, 0, 210, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('PayEase', 20, 20)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Transaction Receipt', 20, 30)

  // Status badge
  const statusColor = transaction.status === 'SUCCESS' ? [22, 163, 74] : [239, 68, 68]
  doc.setFillColor(...statusColor)
  doc.roundedRect(150, 10, 40, 12, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.text(transaction.status, 170, 18, { align: 'center' })

  // Reset
  doc.setTextColor(0, 0, 0)

  // Amount
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(22, 163, 74)
  doc.text(`N${transaction.amount.toLocaleString()}`, 20, 65)

  // Divider
  doc.setDrawColor(229, 231, 235)
  doc.line(20, 75, 190, 75)

  // Details
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(107, 114, 128)

  const rows = [
    ['Reference ID', transaction.referenceId],
    ['Type', transaction.type.replace('_', ' ')],
    ['Status', transaction.status],
    ['Date', new Date(transaction.createdAt).toLocaleString('en-NG')],
    ['Description', transaction.description],
  ]

  if (details.token) rows.push(['Token', details.token])
  if (details.units) rows.push(['Units', details.units])
  if (details.billersCode) rows.push(['Meter/Account', details.billersCode])
  if (details.productName) rows.push(['Product', details.productName])
  if (details.customerName) rows.push(['Customer', details.customerName])

  let y = 90
  rows.forEach(([label, value]) => {
    doc.setTextColor(107, 114, 128)
    doc.text(label, 20, y)
    doc.setTextColor(31, 41, 55)
    doc.setFont('helvetica', 'bold')
    doc.text(String(value || 'N/A'), 90, y)
    doc.setFont('helvetica', 'normal')
    y += 12
  })

  // Footer
  doc.setFillColor(249, 250, 251)
  doc.rect(0, 260, 210, 37, 'F')
  doc.setTextColor(156, 163, 175)
  doc.setFontSize(9)
  doc.text('© 2026 PayEase. All rights reserved.', 105, 275, { align: 'center' })
  doc.text('This is an automatically generated receipt.', 105, 283, { align: 'center' })

  doc.save(`PayEase-Receipt-${transaction.referenceId}.pdf`)
}