import { useRouter } from '@cogoport/next';
import { useState, useRef, useEffect } from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../constants/active-mode-key-mapping';

import CreateScoringPlan from './CreateScoringPlan';
import ListScoringPlans from './ListScoringPlans';

const { LIST, CREATE } = ACTIVE_MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : ListScoringPlans,
	[CREATE] : CreateScoringPlan,
};

function ScoringPlans() {
	const { query: { mode } } = useRouter();

	const currentActiveMode = mode ? CREATE : LIST;

	const [activeMode, setActiveMode] = useState(LIST);

	const objectiveRef = useRef({});

	const Component = COMPONENT_MAPPING[activeMode];

	useEffect(() => {
		setActiveMode(currentActiveMode);
	}, [currentActiveMode]);

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
