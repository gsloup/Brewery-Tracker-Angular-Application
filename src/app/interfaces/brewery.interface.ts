// All API keys returned from Open Brewery DB API

export interface Brewery {
    id: number;
    name: string;
    brewery_type: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    website_url: string;
    updated_at: string;
    favorite?: boolean; // Not part of API-- indicates whether user wants to add to favoritesList
}