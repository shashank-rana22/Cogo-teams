import { useState } from 'react';

import PublicDashboard from './components/PublicDashboard';
import UserDashboard from './components/UserDashboard';
import DASHBOARD_VIEW_CONSTANTS from './constants/dashboard-view-constants';

const { USER, PUBLIC } = DASHBOARD_VIEW_CONSTANTS;

const COMPONENT_VIEW_MAPPING = {
	[USER]: {
		key       : USER,
		Component : UserDashboard,
	},
	[PUBLIC]: {
		key       : PUBLIC,
		Component : PublicDashboard,
	},
};

function Leaderboard() {
	const [view, setView] = useState(PUBLIC);

	const { key, Component } = COMPONENT_VIEW_MAPPING[view] || {};

	if (!Component) return null;

	return (
		<Component key={key} setView={setView} />
	);
}

export default Leaderboard;
