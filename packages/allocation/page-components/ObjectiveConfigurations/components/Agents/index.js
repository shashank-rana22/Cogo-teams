import { useState } from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../constants/active-mode-keys-mapping';
import CreateAndEditObjective from '../CreateAndEditObjective';

import List from './List';

const { LIST, CREATE } = ACTIVE_MODE_KEYS_MAPPING;

const COMPONENT_MAPPING = {
	[LIST]   : List,
	[CREATE] : CreateAndEditObjective,
};

function Agents() {
	const [activeMode, setActiveMode] = useState(LIST);

	const Component = COMPONENT_MAPPING[activeMode];

	if (!Component) return null;

	return <Component key={activeMode} activeMode={activeMode} setActiveMode={setActiveMode} />;
}

export default Agents;
