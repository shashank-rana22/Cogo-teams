import React, { useState } from 'react';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

function CreateFAQ() {
	const [switchDashboard, setSwitchDashboard] = useState(false);

	if (!switchDashboard) {
		return <Analytics setSwitchDashboard={setSwitchDashboard} />;
	}

	return (
		<div>
			<Header setSwitchDashboard={setSwitchDashboard} />

			<QuestionsList />
		</div>
	);
}

export default CreateFAQ;
