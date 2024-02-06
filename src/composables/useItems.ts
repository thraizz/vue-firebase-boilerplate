import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

import { db } from "@/firebase";
import { useUser } from "@/user";

const ITEM_PATH = "items";
type MyItem = {
  id: string;
  text: string;
};

export const useItems = defineStore("items", () => {
  const items = ref<Record<string, MyItem>>({});
  const userStore = useUser();

  const selectedItemId = ref("");

  const uuid = computed(() => userStore.user?.uid);
  const selectedItem = computed<MyItem | undefined>(() => {
    return items.value?.[selectedItemId.value];
  });

  watch(
    () => userStore.isLoggedIn,
    (isLoggedIn) => {
      if (isLoggedIn) {
        fetchItems();
      }
    },
  );

  const fetchItems = async () => {
    if (!userStore.user?.uid) return;
    const itemsCollection = collection(
      db,
      "userdata",
      userStore.user.uid,
      ITEM_PATH,
    );
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = await itemsSnapshot.docs.reduce(
      async (acc, doc) => {
        // Fetch nested `colums` collection
        const columnsCollection = collection(
          itemsCollection,
          doc.id,
          "columns",
        );
        // Get documents from `columns` collection
        const columnsSnapshot = await getDocs(columnsCollection);
        const columns = columnsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return { ...acc, [doc.id]: { ...doc.data(), columns } };
      },
      {} as Promise<Record<string, MyItem>>,
    );
    items.value = itemsList;
  };

  const setAttributeOfItem = async (item: MyItem, text: string) => {
    if (uuid.value === undefined || selectedItemId.value === undefined) return;

    const boardRef = doc(db, "userdata", uuid.value, "items", item.id);
    await updateDoc(boardRef, {
      text,
    });
    fetchItems();
  };

  const putItem = async (item: MyItem) => {
    if (uuid.value === undefined || selectedItemId.value === undefined) return;

    const boardRef = doc(
      db,
      "userdata",
      uuid.value,
      "items",
      selectedItemId.value,
    );
    await setDoc(boardRef, item);
    fetchItems();
  };

  return {
    setAttributeOfItem,
    putItem,
    items,
    fetchItems,
    selectedItem,
    selectedItemId,
  };
});
