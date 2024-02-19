export interface CoffeeShopProps {
  shopId?: number;
  accountId?: number;
  shopName?: string;
  startDate?: string;
  endDate?: string;
  address?: string;
  status?: string;
}

export class CoffeeShop {
  constructor(private readonly props: CoffeeShopProps) {}

  get shopId(): number | undefined {
    return this.props.shopId;
  }

  get accountId(): number | undefined {
    return this.props.accountId;
  }

  get shopName(): string | undefined {
    return this.props.shopName;
  }

  get startDate(): string | undefined {
    return this.props.startDate;
  }

  get endDate(): string | undefined {
    return this.props.endDate;
  }

  get address(): string | undefined {
    return this.props.address;
  }

  get status(): string | undefined {
    return this.props.status;
  }
}
