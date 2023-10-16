import { Post } from '@/types/post'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

interface IdParams extends ParsedUrlQuery {
    id: string
}

type Props = {
    post: Post
}

const BlogItem = ({ post }: Props) => {
    return (
        <div>
            <h1>Blog</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json()
    const paths = posts.map(post => ({
        params: {
            id: post.id.toString()
        }
    }))
    return {
        paths, fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IdParams
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post: Post[] = await res.json()
    return {
        props: {
            post
        },
        revalidate: 7200
    }
}

export default BlogItem
