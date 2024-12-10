import {FC, useState, useEffect} from "react";
import {
    useStorePlayerMutation,
    useLazyFindAllPlayerQuery,
    useDestoryPlayerByIdMutation,
} from "../../api/playerAPI";

interface PlayerData {
    id?: number;
    key: number;
    name: string;
    skill: number;
    isFromDatabase?: boolean;
    isModified?: boolean; // Track if the player was modified
}

const Player: FC = () => {
    const [storePlayer] = useStorePlayerMutation();
    const [findAllPlayer, {data}] = useLazyFindAllPlayerQuery();
    const [destoryPlayerById] = useDestoryPlayerByIdMutation();

    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [errors, setErrors] = useState<Record<number, { name?: string; skill?: string }>>({});

    // Fetch existing player data
    useEffect(() => {
        findAllPlayer();
    }, []);

    // Populate players state if data is available
    useEffect(() => {
        const currentData: any = data?.data;
        if (currentData) {
            const fetchedPlayers = currentData?.map((player: any) => ({
                id: player.id,
                key: player.id, // Use `id` as `key` for database records
                name: player.name,
                skill: player.skill,
                isFromDatabase: true,
                isModified: false,
            }));
            setPlayers(fetchedPlayers);
        } else {
            setPlayers([{key: Date.now(), name: "", skill: 1, isFromDatabase: false}]);
        }
    }, [data]);

    // Add a new player
    const handleAddPlayer = () => {
        const newPlayer: PlayerData = {
            key: Date.now(),
            name: "",
            skill: 1,
            isFromDatabase: false,
            isModified: true,
        };
        setPlayers([...players, newPlayer]);
    };

    // Remove a player
    const handleRemovePlayer = async (player: PlayerData) => {
        if (player.isFromDatabase) {
            try {
                if (confirm("Are you sure want to delete?") === true) {
                    await destoryPlayerById({id: player?.id});
                    setPlayers(players.filter((p) => p.key !== player.key));
                } else {
                    return;
                }
            } catch (err) {
                alert("Failed to delete player.");
            }
        }
        setPlayers(players.filter((p) => p.key !== player.key));
        setErrors((prevErrors) => {
            const updatedErrors = {...prevErrors};
            delete updatedErrors[player.key];
            return updatedErrors;
        });
    };

    // Update player name
    const handleNameChange = (key: number, name: string) => {
        setPlayers(
            players.map((player) =>
                player.key === key
                    ? {...player, name, isModified: true}
                    : player
            )
        );
        validatePlayer(key, name, null);
    };

    // Update player skill level
    const handleSkillChange = (key: number, skill: number) => {
        setPlayers(
            players.map((player) =>
                player.key === key
                    ? {...player, skill, isModified: true}
                    : player
            )
        );
        validatePlayer(key, null, skill);
    };

    // Validate a single player
    const validatePlayer = (
        key: number,
        name: string | null,
        skill: number | null
    ) => {
        const player = players.find((p) => p.key === key) || {name: "", skill: 1};
        const playerName = name ?? player.name;
        const playerSkill = skill ?? player.skill;

        const validationErrors: { name?: string; skill?: string } = {};
        if (!playerName.trim()) validationErrors.name = "Name is required.";
        if (playerSkill < 1 || playerSkill > 5)
            validationErrors.skill = "Skill must be between 1 and 5.";

        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: validationErrors,
        }));
    };

    // Validate all players before saving
    const validateAllPlayers = (): boolean => {
        let hasErrors = false;
        const newErrors: Record<number, { name?: string; skill?: string }> = {};

        players.forEach((player) => {
            const validationErrors: { name?: string; skill?: string } = {};
            if (!player.name.trim()) validationErrors.name = "Name is required.";
            if (player.skill < 1 || player.skill > 5)
                validationErrors.skill = "Skill must be between 1 and 5.";

            if (Object.keys(validationErrors).length > 0) {
                newErrors[player.key] = validationErrors;
                hasErrors = true;
            }
        });

        setErrors(newErrors);
        return !hasErrors;
    };

    // Save players to the database
    const handleSaveToDatabase = async () => {
        if (!validateAllPlayers()) {
            return;
        }

        // Only save modified or new players
        const payload = players.filter(
            (player) => !player.isFromDatabase || player.isModified
        );

        try {
            const transformedPayload: { skill: string; name: string; id: number | undefined }[] = payload.map(player => ({
                id: player.id,
                name: player.name,
                skill: player.skill?.toString(),
            }));
            // const transformedPayload: PlayerPayload[] = payload.map(({key, isFromDatabase, isModified, ...rest}) => ({
            //     ...rest,
            // }));
            const response = await storePlayer({
                playerPayload: transformedPayload,
            }).unwrap();
            if (response.success) {
                alert("Players saved successfully!");
            } else {
                alert("Failed to save players.");
            }
        } catch (error) {
            console.error("Error saving players:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h4 className="mb-4">Players</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>Remove</th>
                        <th>Player Name</th>
                        <th>Skill Level</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player) => (
                        <tr key={player.key}>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemovePlayer(player)}
                                >
                                    ×
                                </button>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors[player.key]?.name ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter player name"
                                    value={player.name}
                                    onChange={(e) =>
                                        handleNameChange(player.key, e.target.value)
                                    }
                                />
                                {errors[player.key]?.name && (
                                    <div className="invalid-feedback">
                                        {errors[player.key]?.name}
                                    </div>
                                )}
                            </td>
                            <td>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Skill Level"
                                >
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            className={`btn ${
                                                level <= player.skill
                                                    ? "btn-danger"
                                                    : "btn-outline-danger"
                                            }`}
                                            onClick={() =>
                                                handleSkillChange(player.key, level)
                                            }
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                                {errors[player.key]?.skill && (
                                    <small className="text-danger">
                                        {errors[player.key]?.skill}
                                    </small>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    <p>
                        Total Players: <strong>{players.length}</strong>
                    </p>
                </div>
                <button className="btn btn-secondary" onClick={handleAddPlayer}>
                    Add Player
                </button>
                {players.length > 0 && (
                    <button
                        className="btn btn-primary ms-2"
                        onClick={handleSaveToDatabase}
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
};

export default Player;
