export const getMatchDateAndTime = (dateTime) => {
    return dateTime.split('T').join(' : ');
}

export const getTodaysDate = () => {
    
    let Todays__Date = new Date();
    var dd = String(Todays__Date.getDate()).padStart(2, '0');
    var mm = String(Todays__Date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = Todays__Date.getFullYear();

    Todays__Date = yyyy + '-' + mm + '-' + dd;
    return Todays__Date;
}