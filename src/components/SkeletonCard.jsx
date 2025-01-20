import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCard = ({cards}) => {
  return (
    Array(cards).fill(0).map((_,index)=>(
      <div key={index}>
      <Skeleton width={170} height={300}/>
    </div>
    ))
    
  )
}

export default SkeletonCard