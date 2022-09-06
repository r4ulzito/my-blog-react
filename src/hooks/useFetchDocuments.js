// react
import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docColletion, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docColletion);

      try {
        let q;

        // busca
        // dashboard

        q = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }

    loadData();
  }, [docColletion, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { loading, error, documents };
};
