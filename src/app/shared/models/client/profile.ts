import { UserProfileFront } from '../backend/userProfileFront';

export interface Profile {
    id: number;
    account?: string;
    name?: string;
    sId?: number;
    service?: string;
    photo?: string;
    level?: number;
} 

export interface Login {
  username: string;
  password: string;
}

export interface LoginSuccess {
  user: UserProfileFront;
  initial: boolean;
  token: string;
  expiration: string;
}

export function mapToProfile(data: UserProfileFront): Profile {
  return {
    id: data.id,
    account: data.account,
    name:data.name,
    sId: data.sId,
    service: data.service,
    photo: data.photo,
    level: data.level,
  };
}


