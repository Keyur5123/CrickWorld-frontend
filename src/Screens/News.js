import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap"
import { getApiKey } from '../RapidApi/getApiKey';
import { googleAnalytics } from '../googleAnalytics/utils';

function Ipl_News(props) {

    const [data, setData] = useState([])
    const [ipl2022data, setIpl2022Data] = useState([])
    const [newsByCategory, setNewsByCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const headers = {
        'X-RapidAPI-Key': getApiKey(),
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }

    useEffect(async () => {

        googleAnalytics()

        newsListByTopics()
        await newsList()
        await newsListByCategory()
        setIsLoading(false)

        setInterval(async () => {
            setIsLoading(true)
            await newsList()
            await newsListByTopics()
            await newsListByCategory()
            setIsLoading(false)
        }, 1000 * 10 * 60)

    }, [])


    const UnixToInsDateConverter = (unixDate) => {
        const timestamp = parseInt(unixDate)
        const date = new Date(timestamp);

        const InsDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return InsDate;
    }

    const newsList = async () => {
        // setIsLoading(true)
        await fetch('https://cricbuzz-cricket.p.rapidapi.com/news/v1/index', { credentials: 'include', headers })
            .then(res => res.json())
            .then(res => {
                setData(res.storyList)
                // setIsLoading(false)
            })
            .catch(err => console.log("errr ;_ ", err))
    }

    const newsListByTopics = async () => {

        try {

            const topicId = [350, 328, 331, 303, 284]

            for (const i of topicId) {

                await fetch(`https://cricbuzz-cricket.p.rapidapi.com/news/v1/topics/${i}`, { credentials: 'include', headers })
                    .then(res => res.json())
                    .then(res => {
                        setIpl2022Data(prevState => [...prevState, res.storyList])
                    })

            }

        } catch (error) {
            console.log("errr ;_ ", error)
        }

    }

    const newsListByCategory = async () => {
        for (let i = 1; i <= 8; i++) {
            await fetch(`https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/${i}`, { credentials: 'include', headers })
                .then(res => res.json())
                .then(res => {
                    setNewsByCategory(newsByCategory => [...newsByCategory, res.storyList])
                })
                .catch(err => console.log("errr ;_ ", err))
        }
    }

    const ads = <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7075823002389650"
        crossOrigin="anonymous" ></script>

    return (
        <div>
            <Container>
                {isLoading &&
                    <div className='mx-auto text-center mt-5 spinner'>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
                }
                <Row>
                    {data && newsByCategory &&
                        data.concat(newsByCategory[0], newsByCategory[1], newsByCategory[2], newsByCategory[3], newsByCategory[4], newsByCategory[5], newsByCategory[6], newsByCategory[7], ipl2022data[0], ipl2022data[1], ipl2022data[2], ipl2022data[3], ipl2022data[4])
                            .filter(news => news?.story)
                            .map((news, index) => (
                                <Col xm={6} md={4} key={index}>
                                    <Card className='mt-2' style={{ backgroundColor: "#EEEEEE", borderBlock: "none" }}>
                                        <Card.Header style={{ backgroundColor: "#BC8CF2", marginLeft: "-1px" }} as="h5">{news.story?.hline}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{news.story?.coverImage.caption}</Card.Title>
                                            <Card.Text>
                                                {news.story?.intro}
                                                {news.story?.seoHeadline}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">updated date :- {UnixToInsDateConverter(news.story?.pubTime)}</Card.Footer>
                                    </Card>
                                </Col>
                            ))}

                    {ads && ads}
                </Row>

                {(!data && !ipl2022data) &&
                    <Alert className='mt-5' variant='danger'>
                        Please Reload The Page...
                        <span role="img" aria-label="sad">😃</span>
                    </Alert>
                }
            </Container>

        </div>
    );
}

export default Ipl_News;