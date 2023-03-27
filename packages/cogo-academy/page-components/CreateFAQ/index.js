import React, { useState } from 'react';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

function CreateFAQ() {
	const [switchDashboard, setSwitchDashboard] = useState(true);

	if (!switchDashboard) {
		return <Analytics setSwitchDashboard={setSwitchDashboard} />;
	}

	return (
		<>
			<Header setSwitchDashboard={setSwitchDashboard} />

			<QuestionsList />
		</>
	);
}

export default CreateFAQ;
