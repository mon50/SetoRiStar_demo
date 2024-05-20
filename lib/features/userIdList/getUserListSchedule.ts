"use client";
import { useAppSelector } from "@/lib/hooks";

export default function getUserListSchedule() {
    const user = useAppSelector((state) => state.user.user);
    if (!user) {
        console.error("User not found");
        return null;
    }
    console.log(user?.uid);
    return user?.uid;
};