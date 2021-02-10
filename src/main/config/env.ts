export default {
  mongo: {
    config: {
      versionCollectionPostfix: process.env.mongo_config_versionCollectionPostfix ?? '_version'
    },
    collections: {
      users: process.env.mongo_collection_users ?? 'users'
    }
  }
}
