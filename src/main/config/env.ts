export default {
  app: {
    basePath: process.env.PWD,
    port: process.env.app_port ?? '3000',
    apiBasePath: process.env.app_apiBasePath ?? '/api',
    healthCheckBasePath: process.env.app_healthCheckBasePath ?? '/health',
    corsControlAllowOrigin: process.env.app_corsControlAllowOrigin ?? '*'
  },
  cryptography: {
    salt: parseInt(process.env.cryptography_salt || '12')
  },
  mongo: {
    url: process.env.MONGO_URL ?? process.env.mongo_url ?? 'mongodb://localhost:27017/ioasys_test-backend',
    config: {
      versionCollectionPostfix: process.env.mongo_config_versionCollectionPostfix ?? '_version'
    },
    collections: {
      users: process.env.mongo_collection_users ?? 'users',
      userRoles: process.env.mongo_collection_userRoles ?? 'userRoles'
    }
  },
  routes: {
    signUp: process.env.routes_signUp ?? '/sign-up'
  }
}
