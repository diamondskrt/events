import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Event from '@/lib/database/models/event.model';
import Order from '@/lib/database/models/order.model';
import { handleError } from '@/utils';
import { CreateUserParams, UpdateUserParams } from '@/types';

export const createUser = async (user: CreateUserParams) => {
  try {
    await dbConnect();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export async function getUserById(userId: string) {
  try {
    await dbConnect();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await dbConnect();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error('User update failed');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string | undefined) {
  if (!clerkId) return;

  try {
    await dbConnect();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath('/');

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
