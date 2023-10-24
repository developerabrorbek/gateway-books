export declare interface RetrieveBookListRequest {
  languageCode: string;
}

export declare interface RetrieveBookListResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  language: string;
  price: number;
  year: string;
  image: string;
  genre: any;
  author: any;
  genreId: string;
  authorId: string;
}
