import { useState } from 'react';

import CreateAndEditObjective from './CreateAndEditObjective';
import ListObjectives from './ListObjectives';

function Objectives() {
	const [activeMode, setActiveMode] = useState({ mode: 'list' });

	return activeMode.mode === 'list' ? <ListObjectives /> : <CreateAndEditObjective />;
}

export default Objectives;
