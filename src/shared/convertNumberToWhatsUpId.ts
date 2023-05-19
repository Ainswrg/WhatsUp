export const convertNumberToWhatsAppId = (
  phoneNumber: number | string
): string => {
  const cleanPhoneNumber = String(phoneNumber).replace(/\D/g, '')
  const formattedNumber = cleanPhoneNumber.startsWith('8')
    ? 7 + cleanPhoneNumber.slice(1)
    : cleanPhoneNumber
  return formattedNumber + '@c.us'
}
