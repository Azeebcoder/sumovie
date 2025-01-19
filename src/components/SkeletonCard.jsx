import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCard = ({cards}) => {
  return (
    Array(cards).fill(0).map((_,index)=>(
      <div key={index}>
      <Skeleton width={240} height={370}/>
    </div>
    ))
    
  )
}

export default SkeletonCard