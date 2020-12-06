module.exports = {
  apps: [
    {
      name: 'tshop-prod',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      args: 'run start'
    }
  ]
}
