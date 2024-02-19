export interface AccountProps {
  id?: string;
  roleId?: string;
  username: string;
  phone?: string;
  address?: string;
  dob?: string;
  email: string;
  password?: string;
}

export class Account {
  constructor(private readonly props: AccountProps) {}

  get id() {
    return this.props?.id;
  }

  get roleId() {
    return this.props?.roleId;
  }

  get username() {
    return this.props?.username;
  }

  get phone() {
    return this.props?.phone;
  }

  get address() {
    return this.props?.address;
  }

  get dob() {
    return this.props?.dob;
  }

  get email() {
    return this.props?.email;
  }

  get password() {
    return this.props?.password;
  }

  toString() {
    return JSON.stringify(this.props);
  }
}
