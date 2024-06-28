import React from 'react'
import './commentCard.css'

function CommentCard({props}) {
  return (
    <div className='cmmntCrd01'>
        <p className='cmmntCrdP01'>{props.userEmail}</p>
        <p className='cmmntCrdP02'>{props.comment}</p>
    </div>
  )
}

export default CommentCard