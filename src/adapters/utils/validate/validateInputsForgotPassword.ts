export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^[0-9]{7,14}$/
  return phoneRegex.test(phoneNumber)
}
