export interface ICatalogue {
    name: string,
    category: string,
    catalogueImgUrl: string,
    fontTitle: string,
    fontBody: string,
    image1: string,
    image2: string,
    image3: string,
    hasCadre: boolean,
    cadre: string,
    colorPrimary: string,
    colorAccent: string,
    defaultConfig: {
        texts: Record <string, string>
    }
}

export interface ICatalogueResponse {
    uuid: string
    name: string,
    category: string,
    catalogueImgUrl: string,
    fontTitle: string,
    fontBody: string,
    image1: string,
    image2: string,
    image3: string,
    hasCadre: boolean,
    cadre: string,
    colorPrimary: string,
    colorAccent: string,
    defaultConfig: {
        texts: Record <string, string>
    }
}

export interface ICustomCatalogue {
    templateUuid: string,
    name: string,
    customImage1: string,
    customImage2: string,
    customImage3: string,
    customHasCadre: boolean,
    customCadreUrl: string,
    customFontTitle: string,
    customFontBody: string,
    customColorPrimary: string,
    customColorAccent: string,
    defaultConfig: {
        texts: Record <string, string>
    }
}

export interface ICustomCatalogueResponse {
    uuid: string
    templateUuid: string,
    name: string,
    customImage1: string,
    customImage2: string,
    customImage3: string,
    customHasCadre: boolean,
    customCadreUrl: string,
    customFontTitle: string,
    customFontBody: string,
    customColorPrimary: string,
    customColorAccent: string,
    defaultConfig: {
        texts: Record <string, string>
    }
}