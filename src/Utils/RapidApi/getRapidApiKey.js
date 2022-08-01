export const getRapidApiKey = () => {
    const AllApiKey = [process.env.REACT_APP_KEYUR_KEY, process.env.REACT_APP_DARSHAN_KEY, process.env.REACT_APP_KSHMA_KEY, process.env.REACT_APP_VISHWAS_KEY, process.env.REACT_APP_VISHVAS_KEY, process.env.REACT_APP_VARSHIP_KEY1, process.env.REACT_APP_VARSHIP_KEY2, process.env.REACT_APP_SMIT1, process.env.REACT_APP_MAYUR, process.env.REACT_APP_PRINCE, process.env.REACT_APP_SMIT2]

    var ApiKey = AllApiKey[Math.floor(Math.random() * AllApiKey.length)];
    return ApiKey;
}