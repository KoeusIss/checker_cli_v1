#!/usr/bin/env node

// Import boxen and chalk
const chalk = require("chalk");
const boxen = require("boxen");
// Import yargs
const yargs = require("yargs");
// Import axios
const axios = require("axios");
const fs = require("fs");
const { get } = require("http");

// Checker boxes style
const requirementSuccessBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#26a655",
  backgroundColor: "#555555"
};
const requirementFailBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#f80002",
  backgroundColor: "#555555"
};
const codeSuccessBox = {
  padding: 1,
  margin: 1,
  borderStyle: "bold",
  borderColor: "#26a655",
  backgroundColor: "#555555"
};
const codeFailBox = {
  padding: 1,
  margin: 1,
  borderStyle: "bold",
  borderColor: "#f80002",
  backgroundColor: "#555555"
}
const efficiencySuccessBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#7601a8",
  backgroundColor: "#555555"
}
const efficiencyFailBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#ffd700",
  backgroundColor: "#555555"
}
const textAnswerSuccessBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#2632a6",
  backgroundColor: "#555555"
}
const textAnswerFailBox = {
  padding: 1,
  margin: 1,
  borderStyle: "single",
  borderColor: "#ff8c00",
  backgroundColor: "#555555"
}

const options = yargs
  .usage('Usage: $0 <command>')
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set the configuration variable',
    handler: (argv) => {
      if (fs.existsSync('.checker')) {
        fs.readFile('.checker', 'utf8', (err, data) => {
          if (err) throw err;
          const configObj = JSON.parse(data);
          const theKey = argv.key;
          const theValue = argv.value;
          configObj[theKey] = theValue;
          const configTxt = JSON.stringify(configObj);
          fs.writeFile('.checker', configTxt, (err) => {
            if (err) throw err;
          })
        });
      } else {
        console.log('You need to run `checker init`')
      }
    }
  })
  .command({
    command: 'init',
    desc: 'Initialize a project directory',
    handler: () => {
      fs.writeFile('.checker', '{}', (err) => {
        if (err) throw err;
      })
    }
  })
  .command({
    command: 'authenticate',
    aliases: ['auth'],
    desc: 'Open connection on the intranet',
    handler: () => {
      if (fs.existsSync('.checker')) {
        fs.readFile('.checker', 'utf8', (err, data) => {
          if (err) throw err;
          const confObj = JSON.parse(data);
          const postData = {};
          postData.email = confObj.email;
          postData.api_key = confObj.api_key;
          postData.password = confObj.password;
          postData.scope = "checker";
          const apiUrl = "https://intranet.hbtn.io"
          axios.post(apiUrl + "/users/auth_token", postData, {
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
              for (const [key, value] of Object.entries(res.data)) {
                confObj[key] = value;
              }
              const configTxt = JSON.stringify(confObj);
              fs.writeFile('.checker', configTxt, (err) => {
                if (err) throw err;
              })
            })
            .catch(error => {
              console.log(error)
            })
        })
      }
    }
  })
  .command({
    command: 'tasks',
    aliases: ['tsk'],
    desc: 'Find the different tasks of the project',
    handler: () => {
      if (fs.existsSync('.checker')) {
        fs.readFile('.checker', 'utf8', (err, data) => {
          if (err) throw err;
          const confObj = JSON.parse(data);
          const apiUrl = `https://intranet.hbtn.io/projects/${confObj.project}.json?auth_token=${confObj.auth_token}`
          axios.get(apiUrl)
            .then(res => {
              res.data.tasks.map((task) => {
                console.log(`[ ${task.id} ] - ${task.title}`);
              })
            })
            .catch(error => {
              console.log(error)
            })
        })
      }
    }
  })
  .command({
    command: 'ask <taskId>',
    desc: "ask for correction",
    handler: (argv) => {
      if (fs.existsSync('.checker')) {
        fs.readFile('.checker', 'utf8', (err, data) => {
          if (err) throw err;
          const confObj = JSON.parse(data);
          const apiUrl = `https://intranet.hbtn.io/tasks/${argv.taskId}/start_correction.json?auth_token=${confObj.auth_token}`
          axios.post(apiUrl, {
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
              console.log(`Correction ID: ${res.data.id}`);
            })
            .catch(error => {
              console.log(error);
            })
        })
      }
    }
  })
  .command({
    command: 'correction <taskId>',
    aliases: ['corr'],
    desc: "Get correction of a given task",
    handler: (argv) => {
      if (fs.existsSync('.checker')) {
        fs.readFile('.checker', 'utf8', (err, data) => {
          if (err) throw err;
          const confObj = JSON.parse(data);
          const requestUrl = `https://intranet.hbtn.io/correction_requests/${argv.taskId}.json?auth_token=${confObj.auth_token}`
          axios.get(requestUrl)
            .then(result => {
              // console.log(result.data.result_display)
              result.data.result_display.checks.map((check) => {
                if (check.check_label === 'requirement') {
                  const msg = chalk.white.bold(check.title);
                  const box = boxen(msg,
                    check.passed === true ? requirementSuccessBox : requirementFailBox
                  )
                  process.stdout.write(box, "")
                } else if (check.check_label === 'code') {
                  const msg = chalk.white.bold(check.title);
                  const box = boxen(msg,
                    check.passed === true ? codeSuccessBox : codeFailBox
                  )
                  process.stdout.write(box)
                } else if (check.check_label === 'answer') {
                  const msg = chalk.white.bold(check.title);
                  const box = boxen(msg,
                    check.passed === true ? textAnswerSuccessBox : textAnswerFailBox
                  )
                  process.stdout.write(box)
                } else if (check.check_label === 'efficiency') {
                  const msg = chalk.white.bold(check.title);
                  const box = boxen(msg,
                    check.passed === true ? efficiencysuccessBox : efficiencyFailBox
                  )
                  process.stdout.write(box)
                }
              })
            })
        })
      }
    }
  })
  .help()
  .wrap(null)
  .argv
