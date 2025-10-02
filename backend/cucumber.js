module.exports = {
  default: {
    require: [
      'features/steps/*.js'
    ],
    paths: ['features/**/*.feature'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json'
    ],
    publishQuiet: true
  }
}
