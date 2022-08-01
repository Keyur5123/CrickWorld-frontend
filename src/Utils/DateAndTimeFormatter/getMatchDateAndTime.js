export const getMatchDateAndTime = (dateTime) => {
    return dateTime.split('T').join(' : ');
}