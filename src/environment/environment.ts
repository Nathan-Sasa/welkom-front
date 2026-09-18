const baseUrl = 'http://localhost:8080';

const authPrefixApi = `${baseUrl}/api/v1/auth`
const oauth2Api = 'http://localhost:8080/oauth2/authorization/google'
const templatePrefix = `${baseUrl}/api/v1/templates`
const eventPrefix = `${baseUrl}/api/v1/event`

export const environment = {
    production: true,
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
            list: '',
            create: `${eventPrefix}/create`
        }
    }
}

// UK2i9wel6di4gi3gx1764d09bmy
// eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiV0xLX1VTRVIiLCJzdWIiOiJuYXRoYW4wMUB0ZXN0LmNvbSIsImlhdCI6MTc4OTQwODczOSwiZXhwIjoxNzg5NDE1OTM5LCJhdWQiOlsibmF0aGFuMDFAdGVzdC5jb20iXX0.YPapifS8eL1Lz2co_WFGrXv1460_kq0Yw5jI8XaPN3U