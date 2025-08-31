export interface IUser  {
  id: number;
  name: string;
  email: string;
  email_verified?: boolean;
  avatar_url?:string ,
  password_hash: string;

}
export interface IAuthenticate { 
  email:string, 
  password_hash:string

}
export interface IRegister {
  name: string;
  email: string;
  password_hash: string;
}
export interface IResponseToken{
  access_token:string
  refresh_token:string
}