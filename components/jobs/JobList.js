import { useSearch } from './JobProvider'
import JobListItem from './JobListItem'
import ArrowDown from '../shared/icons/ArrowDown'
import ArrowUp from '../shared/icons/ArrowUp'

const JobList = ({ jobs }) => {

  const { payload, setPayload } = useSearch()
  const totalCount = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
  const sort_by = [
    {
      key: 'job_title',
      title: 'Title'
    },
    {
      key: 'type',
      title: 'Type'
    },
    {
      key: 'created',
      title: 'Created'
    },
    {
      key: 'work_schedule',
      title: 'Job Shift'
    }
  ]
  const onChangeSort = (key) => {
    let sortData = {};

    sortData[key] = payload['sort'][key] == undefined 
                     ? 'asc' 
                     : payload['sort'][key] == 'asc' ? 'desc' : undefined;

    setPayload({
      filter: payload.filter,
      search: payload.search,
      sort: {
        ...payload.sort,
        ...sortData
      }
    });
  }
 
  return (
    <div className="m-joblist-content relativew-full">
      <div className="m-joblist-sort">
        <h2>
         {totalCount} job postings
        </h2>
        <div className="hidden lg:flex">
          <h2 className="px-2 text-gray-500">Sort by</h2>
          {
            sort_by
            .filter((item) => payload['sort'][item.key] != 'removed')
            .map( (item, index) => (
              <h2 className={`px-2 cursor-pointer items-center flex ${payload['sort'][item.key] != undefined ? 'text-blue-400' : ''}`} key={index} onClick={()=>onChangeSort(item.key)}>
                {item.title}
                { payload['sort'][item.key] != undefined &&
                  payload['sort'][item.key] == 'asc' &&
                  <ArrowDown />
                }
                {
                  payload['sort'][item.key] != undefined &&
                  payload['sort'][item.key] == 'desc' &&
                  <ArrowUp />
                }
              </h2>
            ))
          }
        </div>
      </div>
      {
        jobs.map((item, index) => (
          <JobListItem jobs={item} key={index}/>
        )
      )}
    </div>
  )
}
export default JobList;