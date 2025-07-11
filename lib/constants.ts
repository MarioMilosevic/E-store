import electronics from "../public/categories/electronics.jpg";
import fashion from "../public/categories/fashion.jpg";
import homeGarden from "../public/categories/homeGarden.jpg";
import toys from "../public/categories/toys.jpg";
import games from "../public/categories/games.jpg";
import books from "../public/categories/books.jpg";
import sneakers from "../public/categories/sneakers.jpg";
import watchesJewelry from "../public/categories/watches.jpg";
import art from "../public/categories/art.jpg";
import musicalInstruments from "../public/categories/musicalInstruments.jpg";
import beauty from "../public/categories/beauty.jpg";
import office from "../public/categories/office.jpeg";
import {
  formFieldsObjectsType,
} from "./globalTypes";

export const categories = [
  { imageSrc: electronics, id: "electronics", label: "Electronics" },
  { imageSrc: fashion, id: "fashion", label: "Fashion" },
  { imageSrc: homeGarden, id: "home & garden", label: "Home & Garden" },
  { imageSrc: toys, id: "toys", label: "Toys" },
  { imageSrc: games, id: "games", label: "Games" },
  { imageSrc: books, id: "books", label: "Books" },
  { imageSrc: sneakers, id: "sneakers", label: "Sneakers" },
  {
    imageSrc: watchesJewelry,
    id: "watches-jewelry",
    label: "Watches & Jewelry",
  },
  { imageSrc: art, id: "art", label: "Art" },
  { imageSrc: musicalInstruments, id: "music", label: "Musical Instruments" },
  { imageSrc: beauty, id: "health-beauty", label: "Health & Beauty" },
  { imageSrc: office, id: "office-stationery", label: "Office & Stationery" },
];

export const conditions = [
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
  { id: "refurbished", label: "Refurbished" },
];

export const locations = [
  { id: "us", label: "United States" },
  { id: "south-america", label: "South America" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
];

export const shippingOptions = [
  { id: "free", label: "Free Shipping" },
  { id: "express", label: "Express Shipping" },
];

export const sellingMethods = [
  { id: "auction", label: "Auction" },
  { id: "fixed", label: "Fixed Price" },
];

export const passwordMessage = {
  message: "Password must be at least 8 characters",
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/webp",
];

export const formFieldObjects: formFieldsObjectsType[] = [
  {
    id: "condition",
    name: "condition",
    label: "Condition",
    options: conditions,
    initialLabel: "Select condition",
  },
  {
    id: "category",
    name: "category",
    label: "Category",
    options: categories,
    initialLabel: "Select category",
  },
  {
    id: "itemLocation",
    name: "itemLocation",
    label: "Item Location",
    options: locations,
    initialLabel: "Select location",
  },
  {
    id: "shippingOption",
    name: "shippingOption",
    label: "Shipping Option",
    options: shippingOptions,
    initialLabel: "Select shipping option",
  },
  {
    id: "sellingMethod",
    name: "sellingMethod",
    label: "Selling Method",
    options: sellingMethods,
    initialLabel: "Select selling method",
  },
];

export const dropZoneConfig = {
    maxFiles: 3,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  };