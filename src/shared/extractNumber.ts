export const extractNumberFromWhatsAppId = (whatsappId: string): string => {
  const atIndex = whatsappId.indexOf('@')
  if (atIndex !== -1) {
    return whatsappId.substring(0, atIndex)
  }
  return whatsappId
}
