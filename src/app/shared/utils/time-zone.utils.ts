/**
 * Retourne l'offset du fuseau horaire pour un instant donné.
 *
 * Exemple :
 * Africa/Kinshasa -> +60 minutes
 * Europe/Paris    -> +60 ou +120 minutes selon la date
 */
function getTimeZoneOffsetMinutes(
    timestamp: number,
    timeZone: string
): number {

    const date = new Date(timestamp)

    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        calendar: 'gregory',
        numberingSystem: 'latn',
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).formatToParts(date)

    const values = Object.fromEntries(
        parts
        .filter(part => part.type !== 'literal')
        .map(part => [part.type, part.value])
    )

    const asUTC = Date.UTC(
        Number(values['year']),
        Number(values['month']) - 1,
        Number(values['day']),
        Number(values['hour']),
        Number(values['minute']),
        Number(values['second'])
    )

    return Math.round((asUTC - timestamp) / 60000)
}


/**
 * Transforme une date provenant d'un input datetime-local
 * en OffsetDateTime compatible avec Spring Boot.
 *
 * Exemple :
 *
 * toOffsetDateTime(
 *   '2026-10-30T20:15',
 *   'Africa/Kinshasa'
 * )
 *
 * => '2026-10-30T20:15:00+01:00'
 */
export function toOffsetDateTime(
    localDateTime: string,
    timeZone: string
    ): string {

    if (!localDateTime) {
        throw new Error('La date et l’heure sont obligatoires.')
    }

    if (!timeZone) {
        throw new Error('Le fuseau horaire est obligatoire.')
    }

    const [datePart, timePart] = localDateTime.split('T')

    if (!datePart || !timePart) {
        throw new Error(
        `Format de date invalide : ${localDateTime}`
        )
    }

    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute] = timePart.split(':').map(Number)

    if (
        !year ||
        !month ||
        !day ||
        Number.isNaN(hour) ||
        Number.isNaN(minute)
    ) {
        throw new Error(
        `Format de date invalide : ${localDateTime}`
        )
    }

    /**
     * On considère d'abord la date/heure comme si elle était en UTC.
     *
     * Ce n'est qu'un point de départ pour calculer le véritable offset.
     */
    const localAsUTC = Date.UTC(
        year,
        month - 1,
        day,
        hour,
        minute,
        0
    )

    let timestamp = localAsUTC

    /**
     * Quelques itérations permettent de tenir compte
     * correctement de l'offset du fuseau et notamment
     * des changements d'heure (DST).
     */
    for (let i = 0; i < 3; i++) {
        const offsetMinutes = getTimeZoneOffsetMinutes(
        timestamp,
        timeZone
        )

        timestamp = localAsUTC - offsetMinutes * 60_000
    }

    const finalOffsetMinutes = getTimeZoneOffsetMinutes(
        timestamp,
        timeZone
    )

    const sign = finalOffsetMinutes >= 0 ? '+' : '-'

    const absoluteOffset = Math.abs(finalOffsetMinutes)

    const offsetHours = Math.floor(
        absoluteOffset / 60
    )
        .toString()
        .padStart(2, '0')

    const offsetMinutes = (
        absoluteOffset % 60
    )
        .toString()
        .padStart(2, '0')

    return `${datePart}T${timePart}:00${sign}${offsetHours}:${offsetMinutes}`
}









// function getTimeZoneOffsetMinutes(timestamp: number, timeZone: string): number {
//     const date = new Date(timestamp)

//     const parts = new Intl.DateTimeFormat('en-US', {
//         timeZone,
//         calendar: 'gregory',
//         numberingSystem: 'latn',
//         hourCycle: 'h23',
//         year: '2-digit',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//     }).formatToParts(date)

//     const values = Object.fromEntries(
//         parts
//             .filter(part => part.type !== 'literal')
//             .map(part => [part.type, part.value])
//     )

//     const asUTC = Date.UTC(
//         Number(values['year']),
//         Number(values['month']) -1, 
//         Number(values['hour']),
//         Number(values['minute']),
//         Number(values['second'])
//     )

//     return Math.round((asUTC - timestamp) / 60000)
// }

// export function toOffsetDateTime(localDateTime: string, timeZone: string): string {
//     if (!localDateTime){
//         throw new Error(`La date et l'heure sont obligatoire`)
//     }

//     if (!timeZone){
//         throw new Error(`Le fuseau horaire est obligatoir`)
//     }

//     const [datePart, timePart] = localDateTime.split('T')

//     if (!datePart || !timePart) {
//         throw new Error(`Format de date invalide ${localDateTime}`)
//     }

//     const [year, month, day] = datePart.split('-').map(Number)
//     const [hour, minute] = timePart.split(':').map(Number)

//     if (
//         !year ||
//         !month ||
//         !day ||
//         Number.isNaN(hour) ||
//         Number.isNaN(minute)
//     ) {
//         throw new Error(`Format de date invalide : ${localDateTime}`)
//     }


//     const localAsUTC = Date.UTC(
//         year,
//         month -1,
//         day,
//         hour,
//         minute,
//         0
//     )
//     let timestamp = localAsUTC

//     for(let i=0; i <3; i++){
//         const offsetMinutes = getTimeZoneOffsetMinutes(timestamp, timeZone)

//         timestamp = localAsUTC - offsetMinutes * 60_000
//     }

//     const finalOffsetMinutes = getTimeZoneOffsetMinutes(timestamp, timeZone)

//     const sign = finalOffsetMinutes >= 0 ? '+' : '-'
//     const absoluteOffset = Math.abs(finalOffsetMinutes)

//     const offsetHours = Math.floor(absoluteOffset / 60)
//         .toString()
//         .padStart(2, '0')

//     const offsetMinutes = (absoluteOffset % 60)
//         .toString()
//         .padStart(2, '0')

//     return `${datePart}T${timePart}:00${sign}${offsetHours}:${offsetMinutes}`
// }