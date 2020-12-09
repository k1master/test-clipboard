import React, { useState } from "react"
import Modal from '../shared/Modal'

export const JobFilter =  ({ data, filter, name }) => {
  const [showModal, setShowModal] = useState(false)
  const numberFormat = new Intl.NumberFormat()
  const modal = (
    <Modal open={showModal} titleModal={name} textModal={data[filter]} onClose={()=>{setShowModal(false)} } />
  )

  return (
    <div className="w-full bg-white mb-4 py-4 px-4">
      <h1 className="my-2 font-bold">{name}</h1>
      {
        data[filter].map( (item, index) => {
          {
            if(index < 10)
              return (
                <div
                  key={item.key}
                  className="flex space-x-2 mb-2 cursor-pointer"
                >
                  <h2>{item['key']}</h2>
                  <p className="text-gray-500">{numberFormat.format(item.doc_count)}</p>
                </div>
              )
            else if(index === 10) return (
              <div className="flex my-2" key={index}>
                <h1 className="text-indigo-600 cursor-pointer" onClick={()=>{ setShowModal(true)}}>Show more</h1>
                {modal}
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default JobFilter;
