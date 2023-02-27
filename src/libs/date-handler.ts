export default function dateHandler(date: string | undefined) {
  if (date) {
    const originalDate = new Date()
    const formattedDate = date.split('-')

    originalDate.setFullYear(Number(formattedDate[0]))
    originalDate.setDate(Number(formattedDate[2]))
    originalDate.setMonth(Number(formattedDate[1]) - 1)

    return originalDate.toDateString()
  }

  return new Date().toDateString()
}
