import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'

export default function Posts(){
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>
                            13 de março de 2020
                        </time>
                        <strong>
                            O que é o React?
                        </strong>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, quidem.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['posts.title', 'posts.content'],
        pageSize: 10000,
    }
        
    )

    console.log(response)

    return {
        props: { response }
    }
}