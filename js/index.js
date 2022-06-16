const dynamicallyLoadScript = (url) => {
  const t0 = performance.now();

  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);

  const t1 = performance.now();
  console.log(`Script ${url} loaded in ${t1 - t0}ms.`);
};

dynamicallyLoadScript("js/clock.js");
dynamicallyLoadScript("js/prompt.js");

document.addEventListener("DOMContentLoaded", () => {
  /** @type entryTimer */
  let timer;
  /** @type HTMLButtonElement */
  let timer_button = document.getElementById("entryActions__timectl");
  /** @type HTMLParagraphElement */
  let timer_discard = document.getElementById("entryActions__timediscard");
  /** @type HTMLDivElement */
  let timer_current = document.getElementById("entryActions__currentTime");
  /** @type HTMLInputElement */
  let entry_desc = document.getElementById("entryActions__description");
  /** @type HTMLButtonElement */
  let projsel_button = document.getElementById(
    "entryActions__projectSelectButton"
  );

  function click_projbtn_action() {
    let data = JSON.parse(localStorage.getItem("projects") || "[]");
    displayPromptBox("Select project to record entry under:", data);
  }

  function click_start_action() {
    timer = new entryTimer(timer_current);
    timer.startTimer();
    timer_button.removeEventListener("click", click_start_action);
    timer_button.addEventListener("click", click_stop_action);
    timer_button.innerHTML = "Stop";
    timer_button.classList.toggle("entryDetails__ctlbtn--running");
    timer_discard.addEventListener("click", click_discard_action);
    timer_discard.classList.toggle("entryDetails__timediscard--disp");
  }

  function click_stop_action() {
    let recorded_project = window.selected_project;
    let recorded_desc = entry_desc.value;
    console.log(recorded_project);
    console.log(recorded_desc);

    if (
      recorded_project &&
      recorded_project != "" &&
      recorded_desc &&
      recorded_desc != ""
    ) {
      timer.stopTimer();
      let recorded_time = timer_current.innerHTML.split(":", 3);
      let data = JSON.parse(localStorage.getItem("projects"));
      let exists = false;
      let i, j;
      for (i = 0; i < data.length; ++i) {
        if (data[i].name === recorded_project) {
          break;
        }
      }
      for (j = 0; j < data[i].records.length; ++j) {
        if (data[i].records[j].desc === recorded_desc) {
          exists = true;
          break;
        }
      }

      if(exists)  {
        data[i].records[j].times.push(recorded_time);
      } else  {
        let new_record = {};
        new_record.desc = recorded_desc;
        new_record.times = [recorded_time];
        data[i].records.push(new_record);
      }
      localStorage.setItem("projects", JSON.stringify(data));

      timer_button.removeEventListener("click", click_stop_action);
      timer_button.addEventListener("click", click_start_action);
      timer_button.innerHTML = "Start";
      timer_button.classList.toggle("entryDetails__ctlbtn--running");
      timer_discard.removeEventListener("click", click_discard_action);
      timer_discard.classList.toggle("entryDetails__timediscard--disp");
    } else {
      window.alert("Please select project and description!");
    }
  }

  function click_discard_action() {
    timer.stopTimer();
    timer_current.innerHTML = "00:00:00";
    timer_button.removeEventListener("click", click_stop_action);
    timer_button.addEventListener("click", click_start_action);
    timer_button.innerHTML = "Start";
    timer_button.classList.toggle("entryDetails__ctlbtn--running");
    timer_discard.classList.toggle("entryDetails__timediscard--disp");
  }

  timer_button.addEventListener("click", click_start_action);
  projsel_button.addEventListener("click", click_projbtn_action);
});
