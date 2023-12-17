import type { Game } from "@/app/models/game";

const baseUrl = "http://localhost:9090";
export async function createNewGame(token:string, game: Game) {
    const endpoint = `${baseUrl}/games?token=${token}`;
        const response = await fetch(endpoint, {
            body: JSON.stringify(game), 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        if(response.status < 200 || response.status >= 300){
            console.log(response.status);
        }
}

// This is used for both make move and end game
export async function updateGame(token:string, game: Game) {
    const endpoint = `${baseUrl}/games/${game.id}?token=${token}`;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        });

        if(response.status < 200 || response.status >= 300){
            console.log(response.status);
        }
}