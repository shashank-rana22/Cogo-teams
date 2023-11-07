import { useRouter } from 'next/router';

import MODE_KEYS_MAPPING from './configurations/active-mode-key-mapping';
import CreateQuests from './CreateQuest';
import ListQuests from './ListQuests';

const { LIST, CREATE } = MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : ListQuests,
	[CREATE] : CreateQuests,
};

function QuestPlans() {
	const { query: { mode: defaultMode = LIST } } = useRouter();

	const Component = COMPONENT_MAPPING[defaultMode];

	if (!Component) return null;

	return <Component />;
}

export default QuestPlans;
