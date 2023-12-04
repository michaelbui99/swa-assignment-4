<script lang="ts" setup>
import { games, getuserById } from '@/api/score';
import { useScoreStore } from '@/app/features/scoreSlice';
import { useUserStore } from '@/app/features/userStore';
import type { Game } from '@/app/models/game';
import type { Score } from '@/app/models/score';
import type { User } from '@/app/models/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type PropType, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const score = useScoreStore();
const user = useUserStore();
const router = useRouter();
/* 
const scores = ref({
      getTop10Score: [] as Score[],
      getUserScore: [] as Score[]
    }); */

onMounted(async () => {
    const currentUser = user.currentUser;
    
    if (!currentUser) {
        router.push("/");
    } else {
        const allGames: Game[] | undefined = await games(currentUser.token!); 
        const logedInUser: User | undefined = await getuserById(currentUser.id, currentUser.token!);    
        await score.gethighScores(allGames, logedInUser);
    }
});

const { allScore } = storeToRefs(score);


</script>

<template>
    <div>
    <div>
        <h1>High Score</h1>
    </div>
    <br />
    <div>
        <div>
            <h2>Top 10 scores</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Game</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="score in allScore.top10Score">
                            <td>{{ score.gameId }} </td>
                            <td> </td>
                            <td></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <div>
            <h2>My top score</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(score, index) in getUserScore()" key="index">
                            <td> </td>
                            <td> </td>
                            <td></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div> -->
    </div>
</div>
</template>