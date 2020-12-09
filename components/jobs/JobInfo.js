import React, { useState } from 'react'

const JobInfo = (props) => {
  const { jobInfo } = props
  const [showJobDetail, setShowJobDetail] = useState(false)
  const changeJobDetailStatus = () => {
    setShowJobDetail(!showJobDetail)
  }
  const getWeeks = (created) => {
    return Math.ceil( 
      (Date.now() - Date.parse(created)) / (24 * 60 * 60 * 1000 * 7))
  }

  return (
    <div className="border-t mx-2">
      <div className="flex py-4 px-2 flex items-center cursor-pointer" onClick={changeJobDetailStatus}>
        <div className="w-full">
          <h1 className="font-bold">{ jobInfo.job_title }</h1>
          <h2>{jobInfo.job_type} | ${jobInfo.salary_range[0]} - ${jobInfo.salary_range[1]} an hour | {jobInfo.city} </h2>
        </div>
        <div className="w-1/6">
          <p className="flex flex-row-reverse">{ getWeeks(jobInfo.created) } weeks ago</p>
        </div>
      </div>
      {
        showJobDetail ?
        <div className="px-2 py-2 lg:flex">
          <div className="w-full lg:w-3/4">
            <div className="w-full lg:flex">
              <div className="w-1/2">
                <h1 className="font-bold">Department:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ jobInfo.department.toString() }</h1>
              </div>
            </div>
            <div className="w-full flex py-2">
              <div className="w-1/2">
                <h1 className="font-bold">Hours / shifts:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ jobInfo.hours } hours / Night shift</h1>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-1/2">
                <h1 className="font-bold">Summary:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ jobInfo.description }</h1>
              </div>
            </div>
          </div>

          <div className="m-jobinfo-btn-container lg:w-1/4">
            <div className="m-jobinfo-btn-wrapper">
              <button className="m-jobinfo-detail-btn hover:bg-gray-900">
                Job details
              </button>
            </div>
            <div className="m-jobinfo-btn-wrapper">
              <button className="m-jobinfo-save-btn">
                Save job
              </button>
            </div>
          </div>
        </div>
        : <div></div>
      }
    </div>
  )
}

export default JobInfo;
