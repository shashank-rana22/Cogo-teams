import React, { useState } from 'react';

import Header from './Header';
import QuestionsList from './QuestionsList';

function CreateFAQ() {
	// eslint-disable-next-line no-unused-vars
	const [switchDashboard, setSwitchDashboard] = useState(true);
	return (
		<div>
			<Header setSwitchDashboard={setSwitchDashboard} />

			<QuestionsList />

		</div>
	);
}

export default CreateFAQ;
