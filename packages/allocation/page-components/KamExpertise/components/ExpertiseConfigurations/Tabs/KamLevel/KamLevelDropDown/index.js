import { Button } from '@cogoport/components';
import React from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';
import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ editMode, title, setEditMode, refetch }) {
	const { listkamLevelDetails, listrefetch, listLoading } = useKamExpertiseLevelConfig({ title });

	console.log('listkamLevelDetails', listkamLevelDetails);

	const { formProps, onSave } = useUpdateKamScores({ title, listrefetch, setEditMode, refetch, listkamLevelDetails });
	const { control, handleSubmit, watch } = formProps;

	console.log('watch', watch());

	return (
		<>
			{!editMode ? (
				<Button
					themeType="secondary"
					className={styles.delete_button}
					onClick={(e) => {
						if (title) {
							e.stopPropagation();
						}
						setEditMode(true);
					}}
				>
					Edit
				</Button>
			) : (
				<>

					<Button
						className={styles.delete_button}
						onClick={handleSubmit(onSave)}
						type="submit"
					>
						{' '}
						Save
					</Button>
					<Button
						className={styles.delete_button}
						themeType="secondary"
						style={{ marginRight: '0' }}
						onClick={(e) => {
							e.stopPropagation();
							setEditMode(false);
						}}
					>
						Cancel
					</Button>
				</>
			)}

			<div className={styles.child}>
				{editMode
					? (
						<KamLevelDetailsEdit
							data={listkamLevelDetails}
							control={control}
						/>
					)
					: (
						<KamLevelDetailsShow
							data={listkamLevelDetails}
							listLoading={listLoading}
						/>
					)}
			</div>
		</>
	);
}
export default KamLevelDropDown;
