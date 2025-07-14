import client from '../servers/mongoDB/redisConnectDB';

/**
 * add a token to the blacklist 
 * @param token token to be blacklisted
 */
export const blacklistToken = async ( token: string ) => {
    await client.setEx('blacklisted', 3600 * 24 * 2, token);

    // Use the token itself as part of the key to allow multiple blacklisted tokens 
    //export const blacklistToken = async (token: string, expireInSeconds = 3600 * 24 * 2){
    //await client.setEx(`blacklisted:${token}`, expiryInSeconds,'true'); };
};

/**
 * check if a token is blacklisted
 * @param token token to be checked 
 * @returns boolean 
 */
export const isTokenBlacklisted = async ( token: string ) => {
    //const result = await client.get (`balcklisted:${token}`);
    const result = await client.get('blacklisted');
    // return result === 'true';
    return result === token;
};

/**
 * Remove a token from the balcklist
 * @param token token to be  removed from blacklist
 */
export const removeFromBlacklist = async (token: string) => {
    await client.del(`blacklisted:${token}`);
};