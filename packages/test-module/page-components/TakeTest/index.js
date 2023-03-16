import { useState } from 'react';

import Completion from './Completion';
import Introduction from './Introduction';
import Ongoing from './Ongoing';

const COMPONENT_MAPPING = {
	introduction: {
		key       : 'introduction',
		component : Introduction,
	},
	ongoing: {
		key       : 'ongoing',
		component : Ongoing,
	},
	completion: {
		key       : 'completion',
		component : Completion,
	},
};

function TakeTest() {
	const [activeState, setActiveState] = useState('introduction');

	const Component = COMPONENT_MAPPING[activeState].component;

	return (
	// <Introduction />
		// <Completion />
		<Component setActiveState={setActiveState} />
	);
}

export default TakeTest;
