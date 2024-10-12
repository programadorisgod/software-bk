export const getCurrentDate = (): string => {
  const dateObject = new Date()
  const dateOfDispatch = `${dateObject.toLocaleDateString("es-ES")} a las: ${dateObject.toLocaleTimeString("es-ES")} `
  return dateOfDispatch
}
export const getDateColombia = (): Date=>{
  const fechaServidor = new Date();
  const desfaseColombia = -5; 
  const fechaColombia = new Date(fechaServidor.getTime() + desfaseColombia * 60 * 60 * 1000);
  return fechaColombia
}