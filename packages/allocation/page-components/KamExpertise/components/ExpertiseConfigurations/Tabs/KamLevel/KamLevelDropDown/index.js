import { Button, Placeholder } from '@cogoport/components';
import { React, useState } from 'react';

import useGetKamExpertiseLevelConfig from '../../../../../hooks/useGetKamExpertiseLevelConfig';
import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';
import Card from '../Card';

import styles from './styles.module.css';

function KamLevelDropDown({ refetch, cardRefetch, transition_level }) {
	const [editMode, setEditMode] = useState(false);

	const {
		listkamLevelDetails,
		listLoading,
	} = useGetKamExpertiseLevelConfig({ transition_level });

	const { formProps, onSave, updateLoading } = useUpdateKamScores({
		transition_level,
		refetch,
		cardRefetch,
	});

	const { control, handleSubmit } = formProps;
	const { list } = listkamLevelDetails;

	if (listLoading) {
		return (
			<div style={{ padding: '4px' }}>
				{[1, 2, 3, 4].map(() => (
					<div style={{ padding: '4px' }}>
						<Placeholder width="200px" height="30px" margin="8px" />
						<Placeholder width="100px" height="20px" margin="8px" />
						<Placeholder width="50px" height="20px" margin="8px" />
						<hr className={styles.horizontal_line} />
					</div>
				))}
			</div>
		);
	}

	return (
		<div>
			{editMode ? (
				<>
					<Button
						className={styles.delete_button}
						onClick={handleSubmit(onSave)}
						loading={updateLoading}
						type="submit"
					>
						{' '}
						Save
					</Button>

					<Button
						className={styles.delete_button}
						themeType="secondary"
						disabled={updateLoading}
						style={{ marginRight: '0' }}
						onClick={(e) => {
							e.stopPropagation();
							setEditMode(false);
						}}
					>
						Cancel
					</Button>
				</>
			) : (
				<Button
					themeType="secondary"
					className={styles.delete_button}
					onClick={() => {
						setEditMode(true);
					}}
				>
					Edit
				</Button>
			)}

			<div className={styles.level_card_container}>
				<Card
					control={control}
					editMode={editMode}
					list={list}
					updateLoading={updateLoading}
				/>
			</div>
		</div>
	);
}

export default KamLevelDropDown;
