import { GetStaticProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head';
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    console.log(session)
    return (
        <>
            <Head>
                <title>{post.title} || Ignews</title>
            </Head>

            <main className={styles.container}>
                <article key={post.slug} className={styles.post}>
                    <h1>
                        {post.title}
                    </h1>
                    <time>
                        {post.updatedAt}
                    </time>
                    <div 
                        className={`${styles.post__content} ${styles.preview__content}`}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                        />                
                    
                    <div className={styles.continue__reading}>
                        Wanna continue reading ? 
                        <Link href="/">
                            <a href="">
                                Subscribe now
                            </a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params


    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
    };

    return {
        props: {
            post
        }
    }

}

