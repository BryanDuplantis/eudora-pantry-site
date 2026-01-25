import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    pantryName,
    tagline,
    mainDescription,
    hours,
    address,
    contactInfo,
    donationLink,
    donationQr,
    gallery
  }
`);

export const ANNOUNCEMENTS_QUERY = defineQuery(`
  *[_type == "announcement" && featured == true] | order(date desc) [0...3] {
    _id,
    title,
    date,
    content,
    image
  }
`);

export const MOBILE_PANTRY_QUERY = defineQuery(`
  *[_type == "mobilePantrySchedule"][0] {
    title,
    description,
    location,
    time,
    dates,
    frequency
  }
`);
