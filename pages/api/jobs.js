import orderBy from 'lodash/orderBy';

import jobs from '../../data/jobs.json';

const getJobs = async (req, res) => {
  const body = req.body;
  res.statusCode = 200;
  await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));
  res.json(fetchJobs(body));
}

export const fetchJobs = (body) => {
  let jobsList = [];
  jobs.map(job => {
    let filteredJobs = job.items;

    if (body.search) {
      filteredJobs = job.items.filter(item => searchWithKeyword(item, body.search));
    }
    
    if (filteredJobs.length && Object.keys(body.sort).length > 0) {
      filteredJobs = sortingJobs(filteredJobs, body.sort);
    }
    
    if (filteredJobs.length) {
      jobsList.push({
        ...job,
        total_jobs_in_hospital: filteredJobs.length,
        items: filteredJobs
      });
    }
  });
  return jobsList;
}

const searchWithKeyword = (job, search) => {
  return Object.values(job).some(val => {
    if (typeof val === 'string') {
      return val.toLowerCase().includes(search.toLowerCase());
    } else if (typeof val === 'object') {
      return searchWithKeyword(val, search);
    }
  });
}

const sortingJobs = (jobs, sort) => {

  
  let sortingParams = [];
  let sortingParamsOrder = [];
  let isExistedCreatedInSort = false;

  Object.keys(sort).forEach(key => {
    if (key !== 'created') {
      sortingParams.push(key);
      sortingParamsOrder.push(sort[key]);
    } else {
     isExistedCreatedInSort = true;
    }
  });

  jobs = orderBy(jobs, sortingParams, sortingParamsOrder);

  if (isExistedCreatedInSort) {
    sortByDate(jobs, sort['created']);
  }

  return jobs;
}

const sortByDate = (jobs, order) => {
  jobs.sort(function(a, b) {
    if (order === 'asc') {
      return new Date(b.created) - new Date(a.created);
    } else {
      return new Date(a.created) - new Date(b.created);
    }
  });
  return jobs;
}

export default getJobs;
