'use client'
import { Rate, Spin } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface Props {
    params: {
        product_id: string
    }
}
export default function ProductRatings({ params: { product_id } }: Props) {

    const [ratings, setRatings] = useState<ProductRating[]>([])
    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(10)
    const [total, setTotal] = useState(0)
    const [review_loaded, setReviewLoaded] = useState(false)
    const [page_loaded, setPageLoaded] = useState(false)

    useEffect(() => {
        setReviewLoaded(false)
        const getRating = async () => {
            const form_data = new FormData();
            form_data.set("product_id", product_id)
            form_data.set("skip", skip.toString())
            form_data.set("take", take.toString())
            const fetch_ratings = await fetch("/api/public/products/product/rating", {
                method: "POST",
                body: form_data
            })
            const response_ratings = await fetch_ratings.json()
            if (ratings.length === 0) {
                setRatings(response_ratings.data.ratings)
            } else {
                response_ratings.data.ratings.map((r: any) => {
                    return (
                        setRatings(ratings => {
                            return [...ratings, r]
                        })
                    )
                })
            }
            setTotal(response_ratings.data.stats.total)
            // console.log("response_ratings")
            // console.log(response_ratings)
            setPageLoaded(true)
            setReviewLoaded(true)

        }
        getRating();
    }, [skip])
    return (
        <div>
            {page_loaded ? <div>
                {ratings.length > 0 ?

                    <div className='border-t mt-0 pt-3'>
                        {ratings.map((review, i) => {
                            return <div key={i} className='border-b mb-3 pb-3'>
                                <div className='mb-3'>
                                    <Rate disabled defaultValue={review.stars} />
                                </div>
                                <div className='mb-3'>
                                    <div>
                                        {review.message}
                                    </div>
                                </div>
                                <div className='text-xs'>
                                    Reviewed by: {review.User?.name.slice(0, -3) + "__"}
                                </div>

                            </div>
                        })}

                    </div>
                    : <div>No reviews found</div>}



                <div className='flex'>
                    {review_loaded ?
                        <div>
                            {skip < ((total-take)) ?
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    setSkip(skip => { return (skip + take) })
                                }} href={"#"}>
                                    <span className='text-blue-500 text-xs'>Load More Reviews...</span>
                                </Link>
                                : ""}
                        </div>
                        :
                        <div className='flex mt-5 mb-5'>
                            <div><Spin /></div>
                            <div className='ml-2'>Loading reviews...</div>
                        </div>
                    }
                </div>


            </div>

                :
                <div className='flex mt-5 mb-5'>
                    <div><Spin /></div>
                    <div className='ml-2'>Loading reviews...</div>
                </div>
            }

        </div>
    )
}
