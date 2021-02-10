export default {
  app: {
    basePath: process.env.PWD,
    port: process.env.app_port ?? '3000'
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
