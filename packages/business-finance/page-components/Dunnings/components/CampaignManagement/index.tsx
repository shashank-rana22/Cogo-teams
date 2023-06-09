import React, { useState } from 'react';

import FilterHeaders from './FilterHeaders';

function CampaignManagement() {
	const [globalFilters, setGlobalFilters] = useState({});

	return (
		<div>
			<div>
				<FilterHeaders
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
				/>
			</div>
		</div>
	);
}

export default CampaignManagement;
