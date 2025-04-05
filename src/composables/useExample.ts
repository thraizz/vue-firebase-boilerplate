import { db } from '@/firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useCollection, useCurrentUser, useDocument } from 'vuefire';

const examplesCollection = collection(db, 'examples');

interface Example {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useExample() {
  // Get all examples
  const examples = useCollection(examplesCollection);
  const user = useCurrentUser();

  // Get a single example
  const getExample = (exampleId: string) => {
    return useDocument(doc(examplesCollection, exampleId));
  };

  // Add a new example
  const addExample = async (
    exampleData: Omit<Example, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    const timestamp = serverTimestamp();
    return await addDoc(examplesCollection, {
      ...exampleData,
      userId: user.value?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  // Update a example
  const updateExample = async (exampleId: string, exampleData: Partial<Example>) => {
    const exampleRef = doc(examplesCollection, exampleId);
    return await updateDoc(exampleRef, {
      ...exampleData,
      updatedAt: serverTimestamp(),
    });
  };

  return {
    examples,
    getExample,
    addExample,
    updateExample,
  };
}
