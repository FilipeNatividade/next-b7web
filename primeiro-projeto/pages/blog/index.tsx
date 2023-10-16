import { Props } from '@/types/PropsBlog'
import { Post } from '@/types/post'
import Link from 'next/link'
import React from 'react'

const Blog = ({ name, posts }: Props) => {

    return (
        <div>
            <h1>Blog</h1>
            <p>Blog de {name}</p>

            <ul style={{ border: '1px solid black', padding: '50px',margin:'0 50px' }}>
                {posts.map((post) => (
                    <Link href={`blog/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <li key={post.id} style={{ margin: "10px 0", listStyle: 'none' }}>
                            <h3>title:</h3> {post.title}
                        </li>
                        <hr />
                    </Link>
                ))}
            </ul>
        </div >
    )
}

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json()
    return {
        props: {
            name: 'bonieky',
            posts
        }, revalidate: 7200 //o revalidate serve para ele refazer a requicisão a cada x tempo, aqui no caso são 7200 segundos (duas horas), para que vc não precise fazar o biuld para cada atualização do servidor... por exemplo, se vc posta alguma coisa nova no seu blogue toda segundafeira, vc subiu o site, fez o build, ok, ai para quando vc subeir uma postagem nova e não precisar refazer o biuld, vc programa o revalidate para refazer essa requisição daqui 7 dias, em segundos
    }
}

export default Blog