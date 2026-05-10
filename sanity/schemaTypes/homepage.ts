import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "pantryName",
      title: "Pantry Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "mainDescription",
      title: "Main Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      type: "string",
    }),
    defineField({
      name: "donationLink",
      title: "Donation Link",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook Page URL",
      type: "url",
    }),
    defineField({
      name: "donationQr",
      title: "Donation QR Code",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    }),
  ],
});
