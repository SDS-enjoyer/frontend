// /interfaces/campground.ts

// Base interface for shared properties
export interface BaseCampground {
  id: string;
  name: string;
  address: string;
  tel: string;
}

// Extending BaseCampground for the first case
export interface CampgroundDetails extends BaseCampground {
  district: string;
  province: string;
  postalcode: string;
  picture: string;
}

// Extending BaseCampground for the second case
export interface CampgroundSummary extends BaseCampground {
  _id: string; // additional unique property
}
