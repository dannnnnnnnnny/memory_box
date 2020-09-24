import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from "antd"
import Axios from 'axios'

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }
    

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.likes.length)

                    //if I already click this like button or not 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        

    }, [Likes])

    useEffect(() => {
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setDislikes(response.data.dislikes.length)

                    //if I already click this like button or not 
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })
    }, [Dislikes])


    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }

    const onDislike = () => {
        if(DislikeAction !== null) {
            Axios.post('/api/like/unDisLike', variable)
            .then(response => {
                if (response.data.success) {

                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)

                } else {
                alert('dislike 지우기 실패')
                }
            })
        } else {
            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    if(LikeAction !== null) {
                        setLikeAction(null)
                        setLikeAction(Likes - 1)
                    }
                } else {
                    alert('Like 내리기 실패')
                }
            })
        }
    }


    return (
        <div>
            
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" 
                        theme= {LikeAction === 'liked' ? "filled": "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Likes} </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" 
                        theme={DislikeAction === 'disliked' ? "filled": "outlined"}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Dislikes} </span>
            </span>

        </div>
    )
}

export default LikeDislikes
