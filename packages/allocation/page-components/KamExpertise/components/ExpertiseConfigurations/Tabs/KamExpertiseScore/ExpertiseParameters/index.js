import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import dummyData from './dummyData';
import EditExpertiseParamsCard from './EditExpertiseParamsCard';

function ExpertiseParameters(props) {
	const { expertiseData, key, onClickAddCondition } = props;

	const [editMode, setEditMode] = useState(false);

	return (
		<div>

			<EditExpertiseParamsCard
				setEditMode={setEditMode}
				expertiseData={expertiseData}
				key={key}
				dummyData={dummyData}
				editMode={editMode}
			/>

			<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
		</div>
	);
}

export default ExpertiseParameters;
