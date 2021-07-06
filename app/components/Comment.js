import React from 'react'
import PropType from 'prop-types'
import PostMetaInfo from './PostMetaInfo'

export default function Comment({ comment }) {
    return (
        <div className='comment'>
            <PostMetaInfo
                comment={true}
                by={comment.by}
                time={comment.time}
                id={comment.id}
            />
            <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
    )
}

Comment.propType = {
    comment: PropType.object.isRequired
}