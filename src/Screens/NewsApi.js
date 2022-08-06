import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/News_Api.css"

function NewsApi() {

    const [news, setNews] = useState([]);
    const [visible, setVisible] = useState(5);

    const random = Math.floor(Math.random() * (50 - 3 + 1) ) + 3

    useEffect(async () => {

        await fetch('https://apicricketlivescore.herokuapp.com/cricket-news')
            .then(res => res.json())
            .then(res => {
                const arr = res.articles.splice(random)
                setNews(arr)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {news.length > 0 && <h4 className='NewsApi__Header' style={{ color: "#BC8CF2", fontWeight: "bold" }}>LATEST NEWS</h4>}
            {news && news.slice(0, visible).map((news,index) => (
                <div key={index}>
                    <div className='d-flex '>
                        <img src={news?.urlToImage} alt={news?.source?.name ?? 'news image'} height="90px" className="rounded" />
                        <a className='NewsApi__RedirectLink' target="/blank" href={news?.url}><h6 className='news__title'>{news.title}</h6></a>
                    </div>
                    <hr className='news__devider' />
                </div>
            ))}

            <div className='d-flex justify-content-center'>
                {visible < news.length && (
                    <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More News</button>
                )}
            </div>
        </div>
    );
}

export default NewsApi; 