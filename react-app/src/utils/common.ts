interface Player {
    id: number;
    name: string;
    skill: number;
}

export const calculateTotalSkill = (players: Player[]) => {
    return players.reduce((sum, player) => sum + player.skill, 0);
};
