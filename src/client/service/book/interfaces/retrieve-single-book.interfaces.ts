export declare interface RetrieveSingleBookRequest {
  languageCode: string;
  bookId: string
}

export declare interface RetrieveSingleBookResponse {
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
