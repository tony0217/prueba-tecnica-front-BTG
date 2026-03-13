export interface Transaction {
  id: string;
  fundId: string;
  fundName: string;
  type: 'subscription' | 'cancellation';
  amount: number;
  date: string;
  notificationMethod?: 'email' | 'sms';
}
