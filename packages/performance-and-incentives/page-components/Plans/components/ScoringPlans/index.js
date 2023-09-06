import { useState, useRef } from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../constants/active-mode-key-mapping';

import CreateScoringPlan from './CreateScoringPlan';
import ListScoringPlans from './ListScoringPlans';

const { LIST, CREATE } = ACTIVE_MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : ListScoringPlans,
	[CREATE] : CreateScoringPlan,
};

function ScoringPlans() {
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

export default ScoringPlans;
