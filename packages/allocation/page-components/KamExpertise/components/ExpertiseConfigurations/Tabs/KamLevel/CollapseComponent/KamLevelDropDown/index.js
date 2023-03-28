import { React, useState } from 'react';

import useGetKamExpertiseLevelConfig from '../../../../../../hooks/useGetKamExpertiseLevelConfig';
import useUpdateKamScores from '../../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';

function KamLevelDropDown({ refetch, transition_level }) {
	const [editMode, setEditMode] = useState(false);

	const {
		listkamLevelDetails,
		listrefetch,
		listLoading,
	} = useGetKamExpertiseLevelConfig({ transition_level });

	const { formProps, onSave, updateLoading } = useUpdateKamScores({
		transition_level,
		listrefetch,
		setEditMode,
		refetch,
		listkamLevelDetails,
	});
	const { control, handleSubmit } = formProps;

	return (
		<div>
			{editMode
				? (
					<KamLevelDetailsEdit
						data={listkamLevelDetails}
						control={control}
						handleSubmit={handleSubmit}
						onSave={onSave}
						setEditMode={setEditMode}
						updateLoading={updateLoading}
						formProps={formProps}
					/>
				)
				: (
					<KamLevelDetailsShow
						data={listkamLevelDetails}
						listLoading={listLoading}
						setEditMode={setEditMode}
						transition_level={transition_level}
					/>
				)}
		</div>
	);
}
export default KamLevelDropDown;
