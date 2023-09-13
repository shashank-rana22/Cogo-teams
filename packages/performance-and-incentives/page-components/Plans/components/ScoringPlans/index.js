import { useRouter } from '@cogoport/next';

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

	const Component = COMPONENT_MAPPING[currentActiveMode];

	if (!Component) return null;

	return <Component />;
}

export default ScoringPlans;
