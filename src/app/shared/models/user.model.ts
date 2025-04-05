import { Country } from "./country.model";
import { PaymentInfoProviders, PaymentInfoTypes } from "./payment-info.model";
import { Region } from "./region.model";

export interface CreateUserRequestDto{
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    birthdate: string;
    countryId: number;
    regionId: number;
    paymentMethods: PaymentMethodRequestDto[];
    roleId: number;
}

export interface PaymentMethodRequestDto{
    paymentType: number;
    paymentProvider: number;
    cardNumber: string;
    expirationDate: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    birthdate: string;
    country: Country;
    region: Region;
    paymentType: PaymentInfoTypes;
    paymentProvider: PaymentInfoProviders;
    cardNumber: string;
    expirationDate: string;
}