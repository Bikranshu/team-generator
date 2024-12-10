import { useState, useEffect, useRef } from "react";

import {useStoreEventMutation, useLazyFindEventByIdQuery} from "../../api/eventAPI";
import {calculateTotalSkill,} from "../../utils/common";

const Generator = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState<string>('');

    const [storeEvent] = useStoreEventMutation();
    const  [findEventById, {data}] = useLazyFindEventByIdQuery();

    useEffect(() => {
        if(showInfo) {
            findEventById({id: eventId});
        }
    }, [eventId]);

    const handleShowInfo = async () => {
        if (title.trim() === "") {
            setError("Title is required.");
            return;
        }
        setError(""); // Clear error if the title is valid
        const response = await storeEvent({
            eventPayload: {title:title},
        }).unwrap();
        if (response.success) {
            setShowInfo(true);
            setEventId(response?.data?.eventId?.toString() || '');
            alert("Event saved successfully!");
        } else {
            alert("Failed to save event.");
        }
    };

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            inputRef.current.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(inputRef.current.value);
        }
    };

    const totalPlayers = data?.data?.teams?.reduce((total:number, team:any) => {
        return total + team.players.length;
    }, 0);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Final Output</h2>

            {!showInfo && (
                <div className="mb-4">
                    <label htmlFor="titleInput" className="form-label">
                        Enter Title
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="titleInput"
                            className={`form-control ${error ? "is-invalid" : ""}`}
                            placeholder="Enter event title (e.g., Friday Futsal)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleShowInfo}
                        >
                            Submit
                        </button>
                    </div>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
            )}

            {showInfo && (
                <div className="card">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{title}</h5>
                        <small>{totalPlayers} participants in {data?.data?.teams?.length} teams</small>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="shareLink" className="form-label">
                                Share Link (public draw)
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="shareLink"
                                    className="form-control"
                                    value={data?.data?.publicLink}
                                    ref={inputRef}
                                    readOnly
                                />
                                <button className="btn btn-outline-secondary" onClick={handleCopy}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-copy" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="row">
                            {data?.data?.teams?.map((event:any, index:number) => (
                            <div className="col-md-6" key={index}>
                                <h5 className="text-center">{event.teamName} ({event?.players?.length})</h5>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Skill</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {event?.players?.map((player:any, index:number) => (
                                        <tr key={index}>
                                            <td>{player.serial}</td>
                                            <td>{player.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    style={{ width: "40px" }}
                                                >
                                                    {player.skill}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="text-end">{calculateTotalSkill(event?.players)}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Generator;
