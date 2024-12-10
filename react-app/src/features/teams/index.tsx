import  { FC, useState, useEffect } from "react";
import {
    useStoreTeamMutation,
    useFindAllTeamQuery,
    useDestoryTeamByIdMutation,
} from "../../api/teamAPI";

interface TeamData {
    id?: number;
    key: number;
    title: string;
    isFromDatabase: boolean; // Distinguish between existing and new teams
    isModified: boolean; // Track if the team was modified
}

interface TeamPayload {
    id?: number;
    title: string;
}

const Team: FC = () => {
    const [storeTeam] = useStoreTeamMutation();
    const { data } = useFindAllTeamQuery();
    const [destroyTeam] = useDestoryTeamByIdMutation();

    const [teams, setTeams] = useState<TeamData[]>([]);
    const [errors, setErrors] = useState<Record<number, string>>({});

    // Fetch teams from the database on component mount
    useEffect(() => {
        const currentData:any = data?.data;
        if (currentData) {
            const fetchedTeams = currentData?.map((team: any) => ({
                id: team.id,
                key: team.id, // Use the same as id for existing teams
                title: team.title,
                isFromDatabase: true,
                isModified: false,
            }));
            setTeams(fetchedTeams);
        }
    }, [data]);

    // Add a new team
    const handleAddTeam = () => {
        const newTeam: TeamData = {
            key: Date.now(),
            title: "",
            isFromDatabase: false,
            isModified: true,
        };
        setTeams([...teams, newTeam]);
    };

    // Remove a team
    const handleRemoveTeam = async (team: TeamData) => {
        if (team.isFromDatabase) {
            try {
                // Attempt to delete from the database
                if (confirm("Are you sure want to delete?") === true) {
                    await destroyTeam({ id: team.id }).unwrap();
                    alert("Team removed successfully!");
                }else{
                    return;
                }
            } catch (err) {
                alert("Failed to delete team.");
                return;
            }
        }
        // Remove from local state
        setTeams(teams.filter((t) => t.key !== team.key));
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[team.key];
            return updatedErrors;
        });
    };

    // Update team title
    const handleTitleChange = (key: number, title: string) => {
        setTeams(
            teams.map((team) =>
                team.key === key
                    ? { ...team, title, isModified: true }
                    : team
            )
        );
        validateTeam(key, title);
    };

    // Validate a single team
    const validateTeam = (key: number, title: string) => {
        const validationErrors:any = [];
        if (!title.trim()) validationErrors.push("Title is required.");
        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: validationErrors.join(" "),
        }));
    };

    // Validate all teams
    const validateAllTeams = (): boolean => {
        let hasErrors = false;
        const newErrors: Record<number, string> = {};
        teams.forEach((team) => {
            const validationErrors = [];
            if (!team.title.trim()) validationErrors.push("Title is required.");
            if (validationErrors.length > 0) {
                newErrors[team.key] = validationErrors.join(" ");
                hasErrors = true;
            }
        });
        setErrors(newErrors);
        return !hasErrors;
    };

    // Save teams to the database
    const handleSaveToDatabase = async () => {
        if (!validateAllTeams()) {
            alert("Please fix validation errors before saving.");
            return;
        }

        // Only include new or modified teams in the payload
        const payload = teams.filter(
            (team) => !team.isFromDatabase || team.isModified
        );

        try {
            const transformedPayload: TeamPayload[] = payload.map(({ key, isFromDatabase, isModified, ...rest }) => ({
                ...rest, // Spread the remaining properties
            }));
            const response = await storeTeam({
                teamPayload: transformedPayload,
            }).unwrap();
            if (response.success) {
                alert("Teams saved successfully!");
            } else {
                alert("Failed to save teams.");
            }
        } catch (error) {
            console.error("Error saving teams:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h4 className="mb-4">Teams</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>Remove</th>
                        <th>Team Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((team) => (
                        <tr key={team.key}>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveTeam(team)}
                                >
                                    ×
                                </button>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors[team.key] ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter team name"
                                    value={team.title}
                                    onChange={(e) =>
                                        handleTitleChange(
                                            team.key,
                                            e.target.value
                                        )
                                    }
                                />
                                {errors[team.key] && (
                                    <div className="invalid-feedback">
                                        {errors[team.key]}
                                    </div>
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
                        Total Teams: <strong>{teams.length}</strong>
                    </p>
                </div>
                <button className="btn btn-secondary" onClick={handleAddTeam}>
                    Add Team
                </button>
                {teams.length > 0 && (
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

export default Team;
