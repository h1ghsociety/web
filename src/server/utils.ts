export const getCustomToken = async (
  id: string,
  db: FirebaseFirestore.Firestore,
) => {
  const ref = db.collection("sessions").where("userId", "==", id);

  const snap = await ref.get();

  const currentSession = snap.docs[0]?.data() as {
    expires: Date;
    sessionToken: string;
    userId: string;
  };

  return currentSession.sessionToken;
};

export const updateCustomToken = async (
  id: string,
  token: string,
  db: FirebaseFirestore.Firestore,
) => {
  const ref = db.collection("sessions").where("userId", "==", id);

  const snap = await ref.get();

  const currentSession = {
    uid: snap.docs[0]?.id,
    ...snap.docs[0]?.data(),
  } as {
    uid: string;
    expires: Date;
    sessionToken: string;
    userId: string;
  };

  await db
    .collection("sessions")
    .doc(currentSession.uid)
    .update({
      sessionToken: token,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

  return token;
};
