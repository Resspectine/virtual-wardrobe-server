module.exports = {
  type: 'postgres',
  url: 'postgres://postgres:password@localhost:5444/profile',
  entities: ['src/database/migrations/*{.js,.ts}'],
  synchronize: true,
};
