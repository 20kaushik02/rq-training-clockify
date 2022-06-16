function updateDisplay() {
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let total_time = "00:00:00";
  for (let i = 0; i < projects.length; ++i) {
    total_time = addTimes(total_time, appendProject(projects[i]));
  }

  
  let root = document.getElementById("root");
  root.appendChild();
  return total_time;
}

function appendProject(project) {
  let project_time = "00:00:00";
  for (let i = 0; i < project.records.length; ++i) {
    project_time = addTimes(project_time, appendRecord(project.records[i]));
  }
  return project_time;
}

function appendRecord(record) {
  let record_time = "00:00:00";
  for (let i = 0; i < record.times.length; ++i) {
    record_time = addTimes(record_time, appendTime(record.times[i]));
  }
  return record_time;
}

function appendTime(time) {
  console.log(time);
  return time.time_period;
}

function addTimes(t1, t2) {
  let t_s = new Array(3);
  let t1_s = t1.split(":");
  let t2_s = t2.split(":");

  t_s[2] = Number(t1_s[2]) + Number(t2_s[2]);
  t_s[1] = Number(t1_s[1]) + Number(t2_s[1]) + Math.floor(t_s[2] / 60);
  t_s[0] = Number(t1_s[0]) + Number(t2_s[0]) + Math.floor(t_s[1] / 60);

  t_s[2] %= 60;
  t_s[1] %= 60;

  t_s[0] = t_s[0] > 9 ? `${t_s[0]}` : `0${t_s[0]}`;
  t_s[1] = t_s[1] > 9 ? `${t_s[1]}` : `0${t_s[1]}`;
  t_s[2] = t_s[2] > 9 ? `${t_s[2]}` : `0${t_s[2]}`;

  return t_s.join(":");
}

// project project_time
//     desc start end time