import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId // url로 넘겨준 videoId를 가져옴
    const variable = { videoId: videoId }

    const [Video, setVideo] = useState([])

    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideo(response.data.videoDetail)
                } else {
                    alert('비디오 정보 가져오기 실패')
                }
            })
    }, [])

    // console.log(Video);
    // console.log(Video.writer);

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls />
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={Video.writer && <Avatar src={Video.writer.image} />}
                                title={Video.title}
                                description={Video.description}
                            />
    
                            {/* comments */}
                            
                        </List.Item>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
    
}

export default VideoDetailPage
