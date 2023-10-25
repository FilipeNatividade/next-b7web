import { Layout } from '@/components/Layout'
import { Post } from '@/types/post'
import { GetStaticProps } from 'next'
import Head from 'next/head'
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
        <Layout>
        <div>
        <Head>
        <title>next muito louco</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.body} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://localhost:3000//blog/${post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.body} />
        <meta property="og:image" content="https://localhost:3000/vercel.svg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://localhost:3000//blog/${post.id}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.body} />
        <meta property="twitter:image" content="https://localhost:3000/vercel.svg" />

      </Head>
            
            <h1>Blog</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
        </Layout>
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
