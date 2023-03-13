import React, { useState } from 'react';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

function CreateFAQ() {
	const [switchDashboard, setSwitchDashboard] = useState(false);
	console.log(switchDashboard);
	return (
		<div>
			{switchDashboard
				? (
					<>
						<Header setSwitchDashboard={setSwitchDashboard} />

						<QuestionsList />
					</>
				)

				: <Analytics setSwitchDashboard={setSwitchDashboard} />}

		</div>
	);
}

export default CreateFAQ;
