export default {
  app: {
    basePath: process.env.PWD,
    port: process.env.app_port ?? '3000',
    apiBasePath: process.env.app_apiBasePatb ?? '/api',
    healthCheckBasePath: process.env.app_healthCheckBasePath ?? '/@/health-check',
    corsControlAllowOrigin: process.env.app_corsControlAllowOrigin ?? '*'
  },
  mongo: {
    config: {
      versionCollectionPostfix: process.env.mongo_config_versionCollectionPostfix ?? '_version'
    },
    collections: {
      users: process.env.mongo_collection_users ?? 'users'
    }
  }
}
