import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';
// import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ editMode, title, setEditMode }) {
	const { listkamLevelDetails } = useKamExpertiseLevelConfig({ title });
	// console.log('listkamLevelDetails', listkamLevelDetails);
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
						onClick={(e) => {
							e.stopPropagation();
							// onSave();
						}}
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
					? <KamLevelDetailsEdit data={listkamLevelDetails} />
					: <KamLevelDetailsShow data={listkamLevelDetails} />}
			</div>
		</>
	);
}
export default KamLevelDropDown;
