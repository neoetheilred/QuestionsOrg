export class AuthenticatedResponse {
  constructor(
    public success: boolean,
    public token: string
  ) { }
}
