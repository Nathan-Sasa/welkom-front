export function getDateParts (dateTime: string, timeZone: string) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        calendar: 'gregory',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    const parts = formatter.formatToParts(new Date(dateTime))

    const values = Object.fromEntries(
        parts
            .filter(part => part.type !== 'literal')
            .map(part => [part.type, part.value])
    )

    return {
        year: Number(values['year']),
        month: Number(values['month']),
        day: Number(values['day']) 
    }
}

export function getStartOfWeek(date: Date): Date {

    const day = date.getDay()

    const diff = day === 0
        ? -6
        : 1 - day

    const start = new Date(date)

    start.setDate(
        start.getDate() + diff
    )

    start.setHours(0, 0, 0, 0)

    return start
}