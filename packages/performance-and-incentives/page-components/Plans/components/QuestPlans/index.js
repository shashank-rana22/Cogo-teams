import { useState } from 'react';

import MODE_KEYS_MAPPING from './configurations/active-mode-key-mapping';
import CreateQuests from './CreateQuest';
import ListQuests from './ListQuests';

const { LIST, CREATE } = MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : ListQuests,
	[CREATE] : CreateQuests,
};

function QuestPlans() {
	const [mode, setMode] = useState(LIST);

	const Component = COMPONENT_MAPPING[mode];

	if (!Component) return null;

	return <Component setMode={setMode} />;
}

export default QuestPlans;
