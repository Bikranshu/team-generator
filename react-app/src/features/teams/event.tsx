import {  useEffect } from "react";
import { useLocation} from "react-router-dom";

import { useLazyFindEventByUuidQuery} from "../../api/eventAPI";
import {calculateTotalSkill,} from "../../utils/common";

const Event = () => {
    const location = useLocation();
    const fullUrl = `${window.location.origin}${location.pathname}`;

    const  [findEventByUuid, {data}] = useLazyFindEventByUuidQuery();

    useEffect(() => {
        findEventByUuid({publicLink: encodeURIComponent(fullUrl)});
    }, []);

    const totalPlayers = data?.data?.teams?.reduce((total:number, team:any) => {
        return total + team.players.length;
    }, 0);

    return (
        <div className="container my-5">
                <div className="card">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{data?.data?.eventTitle}</h5>
                        <small>{totalPlayers} participants in {data?.data?.teams?.length} teams</small>
                    </div>
                    <div className="card-body">
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
        </div>
    );
};

export default Event;
