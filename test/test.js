const assert = require('assert');
const { fetchJobs } = require('../pages/api/jobs');
const { mockData } = require('./mockData');
describe('Jobs API', function() {
  it('Should fetch jobs list successfully', () => {
    try {
      fetchJobs(mockData.default);
      assert.ok(true)
    } catch (error) {
      assert.ok(false)
    }
  });
  it('Should have 120 jobs', () => {
    let jobs = fetchJobs(mockData.default);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 120)
  });
  it('Should have 30 jobs with "center" keyword search', () => {
    let jobs = fetchJobs(mockData.search);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 30)
  });
  it('Should have 8 items for first record with "center" keyword search', () => {
    let jobs = fetchJobs(mockData.search);
    assert.equal(jobs[0].total_jobs_in_hospital, 8)
  });
  it('Should have first job item title as "Ambulatory Pacu Nurse" with "center" keyword search', () => {
    let jobs = fetchJobs(mockData.search);
    assert.equal(jobs[0].job_title, "Ambulatory Pacu Nurse")
  });

  it('Should have first job item title as "Chief Nursing Officer" with Job Title Asc Sort', () => {
    let jobs = fetchJobs(mockData.sortWithAsc);
    assert.equal(jobs[0].items[0].job_title, "Chief Nursing Officer")
  });

  it('Should have first job item title as "RN Intensive Care Unit" with Job Title Desc Sort', () => {
    let jobs = fetchJobs(mockData.sortWithDesc);
    assert.equal(jobs[0].items[0].job_title, "RN Intensive Care Unit")
  });

  it('Should have first job item title as "Chief Nursing Officer" with Job Title Asc and Created Asc Sort', () => {
    let jobs = fetchJobs(mockData.multipleSort);
    assert.equal(jobs[0].items[0].job_title, "Chief Nursing Officer")
  });

  it('Should have first job item title as "Scrub Nurse" with Job Title Asc, Created Asc Sort, and "center" keyword search', () => {
    let jobs = fetchJobs(mockData.multipleSortWithSearch);
    assert.equal(jobs[0].items[0].job_title, "Scrub Nurse")
  });

  it('Should have 30 with Job Title Asc, Created Asc Sort, and "center" keyword search', () => {
    let jobs = fetchJobs(mockData.multipleSortWithSearch);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 30)
  });
});