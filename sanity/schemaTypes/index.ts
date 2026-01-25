import { type SchemaTypeDefinition } from "sanity";
import homepage from "./homepage";
import announcement from "./announcement";
import mobilePantrySchedule from "./mobilePantrySchedule";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, announcement, mobilePantrySchedule],
};