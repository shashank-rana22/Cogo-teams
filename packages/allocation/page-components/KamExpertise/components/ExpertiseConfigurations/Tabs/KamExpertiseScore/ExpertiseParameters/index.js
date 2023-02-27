import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import EditExpertiseParamsCard from './EditExpertiseParamsCard';

function ExpertiseParameters(props) {
	const { expertiseData, onClickAddCondition } = props;

	const [editMode, setEditMode] = useState(true);

	return (
		<div>
			{editMode && (<EditExpertiseParamsCard setEditMode={setEditMode} expertiseData={expertiseData} />)}

			<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
		</div>
	);
}

export default ExpertiseParameters;
