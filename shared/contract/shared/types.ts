import { z } from "zod";
import { DifficultySchema } from "./config";

export const StringNumberSchema = z.custom<`${number}`>((val) => {
  return typeof val === "string" ? /^\d+$/.test(val) : false;
});
export type StringNumber = z.infer<typeof StringNumberSchema>;

export const ColorHexValueSchema = z.string().regex(/^#([\da-f]{3}){1,2}$/i);
export type ColorHexValue = z.infer<typeof ColorHexValueSchema>;

export const PersonalBestSchema = z.object({
  acc: z.number().nonnegative().max(100),
  consistency: z.number().nonnegative().max(100),
  difficulty: DifficultySchema,
  lazyMode: z.boolean().optional(),
  language: z
    .string()
    .max(100)
    .regex(/[\w+]+/),
  punctuation: z.boolean().optional(),
  numbers: z.boolean().optional(),
  raw: z.number().nonnegative(),
  wpm: z.number().nonnegative(),
  timestamp: z.number().nonnegative(),
});
export type PersonalBest = z.infer<typeof PersonalBestSchema>;

export const PersonalBestsSchema = z.object({
  time: z.record(StringNumberSchema, z.array(PersonalBestSchema)),
  words: z.record(StringNumberSchema, z.array(PersonalBestSchema)),
  quote: z.record(StringNumberSchema, z.array(PersonalBestSchema)),
  custom: z.record(z.literal("custom"), z.array(PersonalBestSchema)),
  zen: z.record(z.literal("zen"), z.array(PersonalBestSchema)),
});
export type PersonalBests = z.infer<typeof PersonalBestsSchema>;

export const ModeSchema = PersonalBestsSchema.keyof();
export type Mode = z.infer<typeof ModeSchema>;
