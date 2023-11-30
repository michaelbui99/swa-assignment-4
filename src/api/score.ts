import type { Game } from "@/app/models/game";
import type { User } from "@/app/models/user";

const baseUrl = "http://localhost:9090";

export async function getuserById(
    userId: number,
    token: string
): Promise<User | undefined> {
    const endpoint = `${baseUrl}/users/${userId}?token=${token}`;
    const response = await fetch(endpoint);

    try {
        return (await response.json()) ?? undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export async function games(token: string): Promise<Game[] | undefined> {
    const endpoint = `${baseUrl}/games?token=${token}`;
    const gamesResposne = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    try {
        return (await gamesResposne.json()) ?? undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
