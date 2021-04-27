export interface IMovie {
  id: { S: string };
  title: { S: string };
  genre: { S: string };
  length: { S: string };
  reviewScore: { N: number };
}