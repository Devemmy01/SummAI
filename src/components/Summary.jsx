import { useState, useEffect } from "react"

const Summary = () => {
  return (
    <section className='w-full mt-16 max-w-xl'>
      <div className='w-full flex flex-col gap-2'>
        <form className='relative flex justify-center items-center'
          onSubmit={(e) => {}}
        >

          <i className='bx bx-link-alt text-2xl text-gray-400 absolute left-0 w-3 my-2 ml-3'></i>

          <input type="url"
            placeholder="Enter a URL " 
            value={''} 
            onChange={() => {}}  
            required
            className='block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-11 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#07fd44] focus:outline-none focus:ring-0 peer'
          />

          <button type="submit" className="hover:text-[#0cb24c] absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded font-sans text-sm font-medium text-gray-400 peer-focus:text-[#0cb24c]">
            <i class='bx bxs-send text-3xl'></i>
          </button>
        </form>
      </div>
    </section>
  )
}

export default Summary