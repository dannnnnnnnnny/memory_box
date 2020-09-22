import React, { useState } from 'react'
import { Comment, Avatar, Button, Input, Tooltip } from 'antd'
import moment from 'moment';
import { useSelector} from 'react-redux'
import Axios from 'axios';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user) 
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState('')

    const onClickReplyOpen = () => { 
        setOpenReply(!OpenReply) 
    }

    const OnHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    const OnSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id 
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setCommentValue('')
                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })

        
    }


    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment && props.comment.writer.name}
                avatar={<Avatar src={props.comment && props.comment.writer.image} alt />}
                content={<p> {props.comment && props.comment.content} </p>}
                datetime={
                        <span>{moment(props.comment.createdAt).format("MMM DD YY")}</span>
                }
            />

            {OpenReply &&
                <form 
                    style={{ display: 'flex' }} 
                    onSubmit={OnSubmit}
                >
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={OnHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해주세요."
                    />
                    <br />

                    <Button
                        style={{ width: '20%', height: '52px' }}
                        onClick={OnSubmit}
                    >
                        Submit
                    </Button>
                </form>
            }
            

        </div>
    )
}

export default SingleComment
