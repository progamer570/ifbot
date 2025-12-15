type User = {
  id: number;
  firstname: string;
  username?: string; // Optional, as some users may not have a username
};
export default User;
