export class Question {
  constructor(
    public id: number | null,
    public title: string,
    public description: string,
    public creationTime: Date,
    public authorId: number
  ) { }

  public username: string | null = null
}
