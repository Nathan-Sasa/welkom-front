const baseUrl = 'http://localhost:8080';

const authPrefixApi = `${baseUrl}/v1/auth`

export const environment = {
    production: true,
    apisUrl : {
        loginApiUrl: `${authPrefixApi}/login`,
        registerApiUrl: `${authPrefixApi}/register`,
        currentUserApiUrl: `${authPrefixApi}/current`,
        logoutApiUrl: `${authPrefixApi}/logout`,
        refreshApiUrl: `"${authPrefixApi}/refresh-access`,
    }
}