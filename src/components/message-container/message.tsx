'use client'
import React from 'react'

type MessageProps = React.ComponentProps<"div">

function Message({children}:MessageProps) {
  return (
    <div className='border py-1 px-2 w-max rounded'>
      {children}
    </div>
  )
}

export default Message
