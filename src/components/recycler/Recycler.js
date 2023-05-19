import {useRef, useCallback, useState} from 'react'
import Post from './Post'
import {useInfiniteQuery} from 'react-query'
import {getAllTravels} from '../../api/axios'
import "./Recycler.css"
import LoadingSpinner from "./LoadingSpinner";
const Recycler = () => {
    const [/*isLoading,*/ setIsLoading] = useState(false);

    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        error
    } = useInfiniteQuery('/api/travel/getAllTravels', ({pageParam = 0}) => getAllTravels(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            setIsLoading(true);
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                fetchNextPage().then(() =>
                    //setIsLoading(false)
                    console.log("1")
                ).catch(() => {
                    //setIsLoading(false)
                })
            }
            //setIsLoading(false)
        })

        if (post) intObserver.current.observe(post)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])
    if (status === 'error') return <p className='center'>Error: {error.message}</p>

    const content = data?.pages.map(pg => {
        return pg.map((post, i) => {
            if (pg.length === i + 1) {
                return <Post ref={lastPostRef} key={post.id} post={post}/>
            }
            return <Post key={post.id} post={post}/>
        })
    })

    return (
        <>
            {/*{isFetchingNextPage*/}
            {/*    ?*/}
            {/*    {content}*/}
            {/*    :*/}
            {/*    <>*/}
            {/*        {content}*/}
            {/*        <p className="center">Обновление...</p>*/}
            {/*        <p className="center"><a href="src/components/Recycler.js">Вернуться в начало</a></p>*/}
            {/*    </>*/}
            {/*}*/}
            {/*{content}*/}
            {isFetchingNextPage ? <LoadingSpinner/> : content}
            <p className="center"><a href="src/components/recycler/Recycler.js">Back to Top</a></p>
        </>
    )
}
export default Recycler
// import { useState, useRef, useCallback } from 'react'
// import usePosts from './hooks/useTravels'
// import Post from './Post'
//
// const Recycler = () => {
//     const [pageNum, setPageNum] = useState(1)
//     const {
//         isLoading,
//         isError,
//         error,
//         results,
//         hasNextPage
//     } = usePosts(pageNum)
//
//     const intObserver = useRef()
//     const lastPostRef = useCallback(post => {
//         if (isLoading) return
//
//         if (intObserver.current) intObserver.current.disconnect()
//
//         intObserver.current = new IntersectionObserver(posts => {
//             if (posts[0].isIntersecting && hasNextPage) {
//                 console.log('We are near the last post!')
//                 setPageNum(prev => prev + 1)
//             }
//         })
//
//         if (post) intObserver.current.observe(post)
//     }, [isLoading, hasNextPage])
//
//     if (isError) return <p className='center'>Error: {error.message}</p>
//
//     const content = results.map((post, i) => {
//         if (results.length === i + 1) {
//             return <Post ref={lastPostRef} key={post.id} post={post} />
//         }
//         return <Post key={post.id} post={post} />
//     })
//
//     return (
//         <>
//             <h1 id="top">&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 1 - React only</h1>
//             {content}
//             {isLoading && <p className="center">Loading More Posts...</p>}
//             <p className="center"><a href="#top">Back to Top</a></p>
//         </>
//     )
// }
// export default Recycler