
const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cucumber-json',
	reportPath: './cucumber-json/reports',
    pageTitle: 'Test Automation',
	metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Test Run Information',
        data: [
            {label: 'Project', value: 'Capital'},
            {label: 'Release', value: '1'},
            {label: 'Execution Start Time', value: new Date().toLocaleString()},
            {label: 'Execution End Time', value: new Date().toLocaleString()}
        ]
    }
});

