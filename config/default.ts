export default {
  orm: {
    database: 'casl1',
    username: 'user',
    password: 'postgres',
    port: 4000,
    host: 'localhost',
    entities: [__dirname + '/../**/**.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
  },
};
