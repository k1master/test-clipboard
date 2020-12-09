import { useState, useEffect } from 'react'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import JobList from '../components/jobs/JobList'
import JobFilter from '../components/jobs/JobFilter'
import { useSearch } from '../components/jobs/JobProvider'
import SearchIcon from '../components/shared/icons/SearchIcon'

export default function IndexPage() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({})
  const { payload, setPayload } = useSearch()

  const onChangeSearch = (val) => {
    setPayload({
      search: val,
      sort: payload.sort
    })
  }

  useEffect(() => {
    async function getJobs() {
      let response = await fetch('api/jobs', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let res = await response.json()
      setJobs(res)
    }
    async function getFilters() {
      const res = await fetch('api/filters')
      let data = await res.json()
      setFilters(data)
    }
    getJobs()
    getFilters()
  }, [payload])

  return (
    <div>
      <Header/>
      <div className="m-content">
        <div className="m-container container">

          <div className="mx-2">
            <div className="m-searchbar-icon">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search for any job, title, keywords or company"
              onChange={(e) => onChangeSearch(e.target.value)}
              className="m-searchbar-input"/>
          </div>

          <div className="flex">
            <div className="m-filter-container lg:flex w-1/4">
              {
                Object.keys(filters).map( (item, index) => (
                  <JobFilter name={ (item.split('_')).join(" ").toUpperCase() } data={filters} filter={item} key={index}/>
                ))
              }
            </div>
            <div className="m-joblist-container lg:w-3/4">
              <JobList jobs={jobs}/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
