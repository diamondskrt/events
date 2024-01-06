import { CreateUserParams } from '@/types';
import { handleError } from '@/lib/utils';
import dbConnect from '@/lib/database';

export const createUser = async (user: CreateUserParams) => {
  console.log(user);
  try {
    await dbConnect();
  } catch (error) {
    handleError(error);
  }
};
