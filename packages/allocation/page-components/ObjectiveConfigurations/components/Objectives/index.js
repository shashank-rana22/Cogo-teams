import { useState, useRef } from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../constants/active-mode-keys-mapping';
import CreateAndEditObjective from '../CreateAndEditObjective';

import ListObjectives from './ListObjectives';

const { LIST, CREATE, EDIT } = ACTIVE_MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : ListObjectives,
	[CREATE] : CreateAndEditObjective,
	[EDIT]   : CreateAndEditObjective,
};

function Objectives() {
	const [activeMode, setActiveMode] = useState(LIST);

	const objectiveRef = useRef({});

	const Component = COMPONENT_MAPPING[activeMode];

	if (!Component) return null;

	return (
		<Component
			key={activeMode}
			ref={objectiveRef}
			activeMode={activeMode}
			setActiveMode={setActiveMode}
		/>
	);
}

export default Objectives;
