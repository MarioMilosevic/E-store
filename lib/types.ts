export type UserType = {
    id: number;
    fullName: string;
    email: string
    createdDate: Date | null;
    role: 'USER' | 'ADMIN';
}
// sellingProducts
// buyingProducts ili cart