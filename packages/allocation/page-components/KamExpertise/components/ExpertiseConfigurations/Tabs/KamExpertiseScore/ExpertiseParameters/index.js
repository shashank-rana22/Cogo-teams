import React, { useState } from 'react';

import EditExpertiseParamsCard from './EditExpertiseParamsCard';

function ExpertiseParameters({ expertiseData, key }) {
	const [editMode, setEditMode] = useState(true);

	return (
		<div>
			{editMode && (
				<EditExpertiseParamsCard
					setEditMode={setEditMode}
					expertiseData={expertiseData}
					key={key}
				/>
			)}

		</div>

	);
}

export default ExpertiseParameters;
