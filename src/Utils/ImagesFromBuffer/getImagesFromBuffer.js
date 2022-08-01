const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

export const getImages = async (TeamAImage, TeamBImage, matchId, setImg) => {
    const arr = []

    await fetch(`http://localhost:5000/matches/get-images/${TeamAImage}/${TeamBImage}`, {
        method: "POST",
    })
        .then(res => res.json())
        .then(res => {
            var base64Flag = 'data:image;base64,';
            
            var imageAStr = arrayBufferToBase64(res.TeamAImage.data);
            var TeamAurl = base64Flag + imageAStr
            
            var imageBStr = arrayBufferToBase64(res.TeamBImage.data);
            var TeamBurl = base64Flag + imageBStr
            
            arr.push({ matchId: matchId, TeamAurl: TeamAurl , TeamBurl: TeamBurl })
            setImg(img => [...img,arr ] )
        })
        .catch(err => console.log(">>>>> ", err.message))
}


export const getUpcommingMatchesImages = async (TeamAImage, TeamBImage, setImg) => {
    const arr = []

    await fetch(`http://localhost:5000/matches/get-images/${TeamAImage}/${TeamBImage}`, {
        method: "POST",
    })
        .then(res => res.json())
        .then(res => {
            var base64Flag = 'data:image;base64,';
            
            var imageAStr = arrayBufferToBase64(res.TeamAImage.data);
            var TeamAurl = base64Flag + imageAStr
            
            var imageBStr = arrayBufferToBase64(res.TeamBImage.data);
            var TeamBurl = base64Flag + imageBStr
            
            arr.push({ TeamAImage, TeamBImage, TeamAurl: TeamAurl , TeamBurl: TeamBurl })
            setImg(img => [...img,arr ] )
        })
        .catch(err => console.log(">>>>> ", err.message))
}