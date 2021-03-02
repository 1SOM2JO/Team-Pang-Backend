import asyncRedis from 'async-redis';

export default () => {
    return asyncRedis.createClient({
        host: '127.0.0.1',
        port: 6379,
    });
}