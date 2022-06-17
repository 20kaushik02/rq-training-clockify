Date.prototype.addHours = function (num) {
  let diff = num * 60 * 60 * 1000;
  this.setTime(this.getTime() + diff);
  return this;
};
Date.prototype.addMinutes = function (num) {
  let diff = num * 60 * 1000;
  this.setTime(this.getTime() + diff);
  return this;
};
Date.prototype.addSeconds = function (num) {
  let diff = num * 1000;
  this.setTime(this.getTime() + diff);
  return this;
};

function addTimes(t1, t2) {
  let t_s = new Array(3);
  let t1_s = t1.split(":");
  let t2_s = t2.split(":");

  t_s[2] = Number(t1_s[2]) + Number(t2_s[2]);
  t_s[1] = Number(t1_s[1]) + Number(t2_s[1]) + Math.floor(t_s[2] / 60);
  t_s[0] = Number(t1_s[0]) + Number(t2_s[0]) + Math.floor(t_s[1] / 60);

  t_s[2] %= 60;
  t_s[1] %= 60;

  t_s[0] = zeroPadforTens(t_s[0]);
  t_s[1] = zeroPadforTens(t_s[1]);
  t_s[2] = zeroPadforTens(t_s[2]);

  return t_s.join(":");
}

function clearProjectsDisplay() {
  let projects = document.getElementsByClassName("projects")[0];
  let root = document.getElementById("root");

  if (projects) {
    root.removeChild(projects);
  }
}

function setProjectsDisplay() {
  clearProjectsDisplay();


  const projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let projectsDiv = document.getElementsByClassName("projects")[0];
  if (!projectsDiv) {
    projectsDiv = document.createElement("div");
    projectsDiv.className = "projects";

    let root = document.getElementById("root");
    root.appendChild(projectsDiv);
  }

  for (const project of projects) {
    let projectDiv = document.createElement("div");
    projectDiv.className = "project";

    let projectHeaderDiv = document.createElement("div");
    projectHeaderDiv.className = "project__header";

    let projectNameH3 = document.createElement("h3");
    projectNameH3.className = "project__name";
    projectNameH3.innerHTML = `Project name: ${project.name}`;

    let project_time = "00:00:00";

    let projectRecordsUl = document.createElement("ul");
    projectRecordsUl.className = "project__records";

    for (const record of project.records) {
      for (const time of record.times) {
        let start_time_obj = new Date(time.start_time);
        let times = time.time_period.split(":");
        let end_time_obj = new Date(start_time_obj);
        end_time_obj = end_time_obj
          .addHours(Number(times[0]))
          .addMinutes(Number(times[1]))
          .addSeconds(Number(times[2]));

        let projectRecordLi = document.createElement("li");
        projectRecordLi.className = "project__record";

        let recordDescInput = document.createElement("input");
        recordDescInput.type = "text";
        recordDescInput.value = record.desc;
        recordDescInput.className = "record__desc";

        let recordStartDateP = document.createElement("input");
        recordStartDateP.type = "date";
        recordStartDateP.valueAsDate = start_time_obj;
        recordStartDateP.className = "record__startDate";

        let recordStartTimeP = document.createElement("input");
        recordStartTimeP.type = "time";
        recordStartTimeP.step = 1;
        recordStartTimeP.value =
          zeroPadforTens(start_time_obj.getHours()) +
          ":" +
          zeroPadforTens(start_time_obj.getMinutes()) +
          ":" +
          zeroPadforTens(start_time_obj.getSeconds());
        recordStartTimeP.className = "record__startTime";

        let recordEndTimeP = document.createElement("input");
        recordEndTimeP.type = "time";
        recordEndTimeP.step = 1;
        recordEndTimeP.value =
          zeroPadforTens(end_time_obj.getHours()) +
          ":" +
          zeroPadforTens(end_time_obj.getMinutes()) +
          ":" +
          zeroPadforTens(end_time_obj.getSeconds());
        recordEndTimeP.className = "record__endTime";

        let recordTimeP = document.createElement("input");
        recordTimeP.type = "time";
        recordTimeP.step = 1;
        recordTimeP.value = time.time_period;
        recordTimeP.className = "record__time";

        projectRecordLi.appendChild(recordDescInput);
        projectRecordLi.appendChild(recordStartDateP);
        projectRecordLi.appendChild(recordStartTimeP);
        projectRecordLi.appendChild(recordEndTimeP);
        projectRecordLi.appendChild(recordTimeP);

        projectRecordsUl.appendChild(projectRecordLi);

        project_time = addTimes(project_time, time.time_period);
      }
    }

    let projectTimeH3 = document.createElement("h3");
    projectTimeH3.className = "project__time";
    projectTimeH3.innerHTML = `Total time: ${project_time}`;

    projectHeaderDiv.appendChild(projectNameH3);
    projectHeaderDiv.appendChild(projectTimeH3);

    projectDiv.appendChild(projectHeaderDiv);
    projectDiv.appendChild(projectRecordsUl);

    projectsDiv.appendChild(projectDiv);
  }
}

function zeroPadforTens(val) {
  if (val > 9) {
    return `${val}`;
  } else {
    return `0${val}`;
  }
}
