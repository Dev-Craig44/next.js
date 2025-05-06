import { z } from "zod";

// This is a simple schema for validating user data
// In a real world app, you would use a more complex schema
// with more fields and validation rules
const schema = z.object({
  name: z.string().min(3),
});

export default schema;
