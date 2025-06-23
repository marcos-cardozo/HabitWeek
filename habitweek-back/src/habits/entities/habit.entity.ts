import { HabitCompletion, User } from '@prisma/client';

export class Habit {
  id: string;
  name: string;
  description?: string;
  frequency: string[];
  isPublic: boolean;
  userId: string;
  user?: User;
  completions?: HabitCompletion[];
  createdAt: Date;
}