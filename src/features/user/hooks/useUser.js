import { useState, useEffect, useCallback } from "react";
import {
    getUserDetails,
    updateUserDetails,
    uploadProfilePhoto,
    removeProfilePhoto,
} from "../api/userApi";

export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserDetails();
            setUser(data);
        } catch (err) {
            setError(err.message || "Failed to load user details.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const update = useCallback(async (payload) => {
        const data = await updateUserDetails(payload);
        await fetchUser();
        return data;
    }, [fetchUser]);

    const uploadPhoto = useCallback(async (file) => {
        const data = await uploadProfilePhoto(file);
        await fetchUser();
        return data;
    }, [fetchUser]);

    const removePhoto = useCallback(async () => {
        const data = await removeProfilePhoto();
        await fetchUser();
        return data;
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser, update, uploadPhoto, removePhoto };
}