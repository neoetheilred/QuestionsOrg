export class Answer {
  constructor(
    public id: number | null,
    public text: string,
    public authorId: number,
    public questionId: number
  ) { }
}
