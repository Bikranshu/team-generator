import {Routes as RouterRoutes, Route} from 'react-router-dom';

import Player from '../features/players/index';
import Team from '../features/teams/index';
import Generator from '../features/teams/generator';
import Event from '../features/teams/event';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="players" element={<Player/>}/>
            <Route path="teams" element={<Team/>}/>
            <Route path="team-generator" element={<Generator/>}/>
            <Route path=":uuid" element={<Event/>}/>
        </RouterRoutes>
    )
}

export default Routes
