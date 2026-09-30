const baseUrl = 'http://localhost:8080';

const authPrefixApi = `${baseUrl}/api/v1/auth`
const oauth2Api = 'http://localhost:8080/oauth2/authorization/google'
const templatePrefix = `${baseUrl}/api/v1/templates`
const eventPrefix = `${baseUrl}/api/v1/events`

export const environment = {
    apisUrl : {
        auth: {
            oauthApi: oauth2Api,
            loginApiUrl: `${authPrefixApi}/login`,
            registerApiUrl: `${authPrefixApi}/register`,
            currentUserApiUrl: `${authPrefixApi}/me`,
            logoutApiUrl: `${authPrefixApi}/logout`,
            refreshApiUrl: `"${authPrefixApi}/refresh`,
        },
        templateUrl: {
            prefix: templatePrefix,
            list: `${templatePrefix}/list`,
            create: `${templatePrefix}/create`
        },
        eventUrl: {
            prefix: eventPrefix,
            list: `${eventPrefix}/my-events`,
            create: `${eventPrefix}/create`
        },
        catalogueUrl: {
            customize: eventPrefix
        }
    }
}
