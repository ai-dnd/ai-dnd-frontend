module.exports = {
  apps: [
    {
      name: 'ai-dnd-frontend-dev',
      script: 'npm',
      args: 'run preview:test',
      cwd: '/path/to/your/frontend',
      env: {
        NODE_ENV: 'development',
        PORT: 4173
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 4173
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'ai-dnd-frontend-prod',
      script: 'npm',
      args: 'run preview',
      cwd: '/path/to/your/frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ]
}
