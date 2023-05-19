import {useCallback, useRef, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {getTravelHistory, userEmail} from "../../../api/axios";
import LoadingSpinner from "../LoadingSpinner";
import HistoryPost from "./HistoryPost";
import "./../Recycler.css"



const HistoryRecycler = () => {
    //const [isLoading, setIsLoading] = useState(false);

    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        error
    } = useInfiniteQuery('/api/travel/getTravelHistoryByAuthor', ({pageParam = 1}) => getTravelHistory(pageParam, userEmail), {
        getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    })

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            //setIsLoading(true);
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                fetchNextPage().then(() =>
                   // setIsLoading(false)
                    console.log('1')
                ).catch(() => {
                   // setIsLoading(false)
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
                return <HistoryPost ref={lastPostRef} key={post.id} post={post}/>
            }
            return <HistoryPost key={post.id} post={post}/>
        })
    })

    return (
        <>
            {isFetchingNextPage ? <LoadingSpinner/> : content}
            <p className="center"><a href="src/components/recycler/history/HistoryRecycler.js">Вернуться в начало</a></p>
        </>
    )
}
export default HistoryRecycler