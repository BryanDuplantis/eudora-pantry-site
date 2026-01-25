import { defineType, defineField } from "sanity";

export default defineType({
  name: "mobilePantrySchedule",
  title: "Mobile Pantry Schedule",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Cruising Cupboard Schedule",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "e.g., 4:30 PM - 5:30 PM",
    }),
    defineField({
      name: "dates",
      title: "Upcoming Dates",
      type: "array",
      of: [{ type: "date" }],
    }),
    defineField({
      name: "frequency",
      title: "Frequency",
      type: "string",
      description: "e.g., Every 4th Thursday of the month",
    }),
  ],
});
