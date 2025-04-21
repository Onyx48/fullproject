import React from 'react'

function Container({children}) {
  return (
    <div className='h-full w-full mx-auto px-4 max-w-7xl'>
      {children}
      
    </div>
  )
}

export default Container
