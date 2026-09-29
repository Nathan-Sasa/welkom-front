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