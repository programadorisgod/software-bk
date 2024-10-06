export const getCurrentDate = (): string => {
  const dateObject = new Date()
  const dateOfDispatch = `${dateObject.toLocaleDateString("es-ES")} a las: ${dateObject.toLocaleTimeString("es-ES")} `
  return dateOfDispatch
}
