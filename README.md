# **Documentation**

Deployment process
-------------
- git remote add origin https://raquel-f/job-board-api
- git add .
- git commit
- git push origin master

Deployed API
-------------
https://ws-job-api.herokuapp.com/

-------------
**EndPoints**
-------------

- Skills
  - Get all skills <br>
curl -v http://localhost:3000/skill/
  - Get one skill by id <br>
curl -v http://localhost:3000/skill/[id]
  - add skill  <br>
curl -d "{\"name\":\"[name]\", \"description\": [description]}" -H "Content-Type: application/json" -X PUT http://localhost:3000/skill/new
  - update skill <br>
curl -d "{\"name\":\"[name]\", \"description\": [description]}" -H "Content-Type: application/json" -X PUT http://localhost:3000/skill/update/[id]
  - delete skill <br>
curl -X DELETE http://localhost:3000/skill/delete/[id]

- Job Type
  - Get all job types <br>
curl -v http://localhost:3000/jobType/
  - get job type by id <br>
curl -v http://localhost:3000/jobType/[id]
  - add job type <br>
curl -d "{\"job_type\":\"[job type]\"}" -H "Content-Type: application/json" http://localhost:3000/jobType/new
  - update job type <br>
curl -d "{\"job_type\":\"[job type]\"}" -H "Content-Type: application/json" -X PUT http://localhost:3000/jobType/update/[id]
  - delete job type <br>
curl -X DELETE http://localhost:3000/jobType/delete/[id]

- Location
  - Get all locations <br>
curl -v http://localhost:3000/location/
  - get location by id <br>
curl -v http://localhost:3000/location/[id]
  - add location <br>
curl -d "{\"street\":\"[street]\",\"city\":\"[city]\",\"country\":\"[country]\",\"zip\":\"[zip code]\"}" -H "Content-Type: application/json" http://localhost:3000/location/new
  - update location  <br>
curl -d "{\"street\":\"[street]\",\"city\":\"[city]\",\"country\":\"[country]\",\"zip\":\"[zip code]\"}" -H "Content-Type: application/json" http://localhost:3000/location/update/[id]
  - delete location <br>
curl -X DELETE http://localhost:3000/location/delete/[id]

- Job Post
  - Get all job posts <br>
curl -v http://localhost:3000/jobPost/
  - get job posts by id <br>
curl -v http://localhost:3000/jobPost/[id]
  - add job post <br>
curl -d "{\"created_date\":\"[date]\",\"job_title\":\"[title]\",\"job_description\":\"[job description]\",\"is_active\":[is active],\"job_location_id\":[id of job location], \"job_type_id\":[id of job type]}" -H "Content-Type: application/json" http://localhost:3000/jobPost/new
  - update job post <br>
curl -d "{\"created_date\":\"[date]\",\"job_title\":\"[title]\",\"job_description\":\"[job description]\",\"is_active\":[is active],\"job_location_id\":[id of job location], \"job_type_id\":[id of job type]}" -H "Content-Type: application/json" http://localhost:3000/jobPost/update/[id]
  - delete job post <br>
curl -X DELETE http://localhost:3000/jobPost/delete/[id]


- Skill Set
  - Get all skills sets <br>
curl -v http://localhost:3000/skillSet/
  - get all skill sets for a job post <br>
curl -v http://localhost:3000/skillSet/job/[job id]
  - get skill set by id <br>
curl -v http://localhost:3000/skillSet/[id]
  - add skill set <br>
curl -d "{\"skill_level\":[skill level],\"skill_id\":[skill id],\"job_post_id\":[job post id]}" -H "Content-Type: application/json" http://localhost:3000/skillSet/new
  - update skill set <br>
curl -d "{\"skill_level\":[skill level],\"skill_id\":[skill id],\"job_post_id\":[job post id]}" -H "Content-Type: application/json" http://localhost:3000/skillSet/update/[id]
  - delete skill set <br>
curl -X DELETE http://localhost:3000/skillSet/delete/[id]
