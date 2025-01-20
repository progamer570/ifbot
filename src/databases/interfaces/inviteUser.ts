export interface Invite {
  username: string;
  userId: string;
}

export interface InviteUser {
  userId: string;
  inviteUsed?: number;
  invites: Invite[];
  lastRequestDate: Date;
  dailyRequests: number;
}
