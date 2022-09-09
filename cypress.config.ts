import { defineConfig } from "cypress";
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");
const exec = require("child_process").execSync;
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const cucumber = require("cypress-cucumber-preprocessor").default;
const fs = require("fs-extra");
const path = require("path");
const ReportGenerator = require("lighthouse/report/generator/report-generator");
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

//Get cypress CLI options using 'minimist
const args = require("minimist")(process.argv.slice(3));

// get environment from args..
const environment = getEnvironment(args);

function getEnvironment(args) {
  let environment;

  if (args.env) {
    if (args.env === true) {
      // if --env flag is passed from CLI but without following any arguments
      environment = "dev";
      return "dev";
    }

    const getEnv = args.env.split(",");

    getEnv.map((curr, index) => {
      const envProperty = curr.split("=");

      if (envProperty[0] === "configFile") {
        environment = envProperty[1];
      }

      if (index >= getEnv.length && environment === undefined) {
        // if --env flag is passed from CLI, but doesn't contain any 'configFile' argument
        environment = "dev";
      }
    });
    return environment;
  } else {
    // if no --env flag is passed from CLI
    environment = "dev";
    return "dev";
  }
}

/**
 * @type {Cypress.PluginConfig}
 */
export default defineConfig({
  chromeWebSecurity: false,
  projectId: "cbe7ws",
  reporter: "cypress-multi-reporters",
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 10000,
  execTimeout: 10000,
  screenshotsFolder: "cypress-test/reports/screenshots",
  video: false,
  experimentalFetchPolyfill: true,
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    cypressMochawesomeReporterReporterOptions: {
      reportDir: "cypress-test/reports/tests",
      charts: true,
      reportPageTitle: "AKQA QA Automation Framework Workshop",
      embeddedScreenshots: true,
      inlineAssets: true,
      quite: true,
      html: false,
      json: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress-test/reports/xml/test-report-[hash].xml",
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        prepareAudit(launchOptions);
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--disable-gpu");
          return launchOptions;
        }
      });

      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("task", {
        lighthouse: lighthouse((lighthouseReport) => {
          const dirPath = "cypress-test/reports/PerfReports";
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          fs.writeFileSync(
            `${dirPath}/index.html`,
            ReportGenerator.generateReport(lighthouseReport.lhr, "html")
          );
          const name =
            lighthouseReport.lhr.requestedUrl.replace(
              /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,
              function (x) {
                return "";
              }
            ) +
            " - " +
            lighthouseReport.lhr.fetchTime.split("T")[0];
          fs.writeFileSync(
            `${dirPath}/GLH-(${name}).json`,
            JSON.stringify(lighthouseReport, null, 2)
          );
        }),
      });

      //Cucumber plugin
      on("file:preprocessor", cucumber());

      /** Accessibility Report for violations */
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });

      function getConfigurationByFile(env) {
        const pathToConfigFile = path.resolve(
          "cypress/config",
          `${env}.config.json`
        );
        return fs.readJson(pathToConfigFile);
      }
      //if no environment is provided, then Dev env will be default
      addMatchImageSnapshotPlugin(on, config);

      const env = config.env.configFile || "dev";
      return getConfigurationByFile(env);
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
