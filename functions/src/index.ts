import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall } from 'firebase-functions/v2/https';

// Initialize Firebase Admin
initializeApp();

const db = getFirestore();

export const deleteUserData = onCall(async (request) => {
  try {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new Error('User ID is required');
    }

    const batch = db.batch();

    /*
     * Delete user's ratings from the top-level ratings collection
     * TODO: Add everthing here that the user has created
     */

    // Commit all deletions
    await batch.commit();

    return { success: true };
  }
  catch (error) {
    console.error('Error deleting user data:', error);
    throw new Error('Failed to delete user data');
  }
});
