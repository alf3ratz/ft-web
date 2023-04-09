import React from 'react'

const Post = React.forwardRef(({ post }, ref) => {

    const postBody = (
        <>
            <h2>{post.author}</h2>
            <p>Адрес отправления: {post.placeFrom}</p>
            <p>Адрес назначения: {post.placeTo}</p>
            <p>Количество попутчиков: {post.countOfParticipants}</p>
            <p>Дополнительная информация: {post.comment}</p>
            <p>Travel ID: {post.id}</p>
        </>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>

    return content
})

export default Post