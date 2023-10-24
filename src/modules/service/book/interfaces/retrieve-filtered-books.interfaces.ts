export declare interface RetrieveFilteredBookRequest {
  languageCode: string;
  genreId: string;
  authorId: string;
  status: string;
}


export declare interface RetrieveFilteredBooksResponse {
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
