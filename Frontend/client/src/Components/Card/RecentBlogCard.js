import React from 'react'
import {Link} from "react-router-dom"
function RecentBlogCard({image,title,date,id}) {
    return (
        <div className="w-[90vw] sm:w-[500px]  md:w-[240px] lg:w-[330px] flex flex-col gap-[10px]">
            <div>
                <Link to={`/SingleBlog/${id._id}`}><img  src={`data:image/*;base64,${btoa(
                    new Uint8Array(image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt="" className='w-[90vw] h-[220px] sm:h-[250px] md:h-[180px] sm:w-[500px] md:w-[240px] lg:w-[330px] lg:h-[230px] object-cover hover:scale-105 duration-300 '/></Link>
            </div>
            <div className='px-[10px] w-[90vw] sm:w-[500px] md:w-[240px] lg:w-[330px]'>
                <h className="text-[18px] sm:text-[20px] font-semibold">{title}</h>
    
            </div>
            <div className='px-[10px] text-[#b8b8b8] font-fair tracking-wider'>
                <span>{date.slice(0,10)}</span>
            </div>
          
        </div>
      )
}

export default RecentBlogCard
