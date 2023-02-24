import React, { useState } from 'react';

import EditExpertiseParamsCard from './EditExpertiseParamsCard';

function ExpertiseParameters({ expertiseData }) {
	const [editMode, setEditMode] = useState(true);

	return (
		<div>
			{editMode && (<EditExpertiseParamsCard setEditMode={setEditMode} expertiseData={expertiseData} />)}

		</div>

	);
}

export default ExpertiseParameters;
