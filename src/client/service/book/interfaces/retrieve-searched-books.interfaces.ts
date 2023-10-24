export declare interface RetrieveSearchedBooksRequest {
  languageCode: string;
  text: string;
}

export declare interface RetrieveSearchedBooksResponse {
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
