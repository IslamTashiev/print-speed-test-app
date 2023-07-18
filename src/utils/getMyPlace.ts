import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getMyPlace = async (currentSpeed: number) => {
	const q = query(collection(db, "users"), where("bestSpeed", ">", currentSpeed));
	const usersSnapshot = await getDocs(q);
	const data = usersSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));

	return data.length;
};
