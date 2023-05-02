import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface AccessControlStore {
    token: string;
    updateToken: (_: string) => void;
    isAuthorized: () => boolean;
}

export const ACCESS_KEY = "access-control";

export const useAccessStore = create<AccessControlStore>()(
    persist(
        (set, get) => ({
            token: "",
            isAuthorized() {
                return (
                    !!get().token
                );
            },
            updateToken(token: string) {
                set((state) => ({token}));
            },
        }),
        {
            name: ACCESS_KEY,
            version: 1,
        },
    ),
);
