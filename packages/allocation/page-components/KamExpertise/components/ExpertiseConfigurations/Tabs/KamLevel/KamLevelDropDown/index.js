import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';
// import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ action = '', title, setAction = () => {} }) {
	const { listkamLevelDetails } = useKamExpertiseLevelConfig({ title });
	const [showEditBtn, setshowEditBtn] = useState(true);
	console.log('listkamLevelDetails', listkamLevelDetails);

	return (
		<>
			{showEditBtn ? (
				<Button
					themeType="secondary"
					className={styles.delete_button}
					onClick={(e) => {
						if (title) {
							e.stopPropagation();
						}
						setshowEditBtn(false);
						setAction('edit');
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
							setshowEditBtn(true);
							setAction('show');
						}}
					>
						Cancel
					</Button>
				</>
			)}

			<div className={styles.child}>
				{action === 'show'
					? <KamLevelDetailsShow data={listkamLevelDetails} />
					: <KamLevelDetailsEdit data={listkamLevelDetails} />}
			</div>
		</>
	);
}
export default KamLevelDropDown;
