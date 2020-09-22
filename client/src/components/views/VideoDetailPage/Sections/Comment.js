import React, { useState } from 'react'
import Axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import { useSelector } from 'react-redux';

import {
    Form,
    Input,
    Button,
  } from 'antd';


const { TextArea } = Input;


function Comment(props) {
    const postId = props.videoId
    const user = useSelector(state => state.user)   // state에서 user정보를 가져옴 (redux)
    const [commentValue, setcommentValue] = useState('')

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response=> {
                if(response.data.success) {
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                    setcommentValue('')
                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={postId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} postId={postId} />
                    </React.Fragment>
                )
                
            ))}
            

            {/* Root Comment Form */}

            <form 
                style={{ display: 'flex' }} 
                onSubmit={onSubmit}
            >
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요."
                />
                <br />

                <Button
                    style={{ width: '20%', height: '52px' }}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Comment
