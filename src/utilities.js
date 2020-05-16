export const getUserData = (doc) => {
  return { id: doc.id, displayName: doc.data().displayName };
};
