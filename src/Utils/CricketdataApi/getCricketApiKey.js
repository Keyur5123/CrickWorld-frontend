export const getCricketApiKey = () => {
    const AllApiKey = [process.env.REACT_APP_KEYUR_CRICKDATA,process.env.REACT_APP_DAD_CRICKDATA,process.env.REACT_APP_VISHWAS_CRICKDATA,process.env.REACT_APP_VISHVAS_CRICKDATA,process.env.REACT_APP_KSHMA_CRICKDATA]

    var ApiKey = AllApiKey[Math.floor(Math.random() * AllApiKey.length)];
    // return ApiKey;
    return "16ebfc12-fc69-4bc9-b248-1e5237df0f2a";
}