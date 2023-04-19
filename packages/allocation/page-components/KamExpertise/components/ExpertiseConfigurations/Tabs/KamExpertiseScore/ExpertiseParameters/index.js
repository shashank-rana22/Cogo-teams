import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useEditExpertiseParameters from '../../../../../hooks/useEditExpertiseParameters';
import useGetExpertiseParameters from '../../../../../hooks/useGetExpertiseParameters';

import CardItem from './CardItem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ExpertiseParameters(props) {
	const { onClickAddCondition, activeCollapse = '', cardRefetch } = props;

	const [editMode, setEditMode] = useState(false);

	const { listExpertiseParams, expertiseRefetch, expertiseLoading } = useGetExpertiseParameters(activeCollapse);
	const { list = [] } = listExpertiseParams || {};

	const {
		onSave,
		handleSubmit,
		control,
		loading: editLoading,
	} = useEditExpertiseParameters({ list, expertiseRefetch, setEditMode, cardRefetch });

	if (isEmpty(list) && !expertiseLoading) {
		return (
			<div className={styles.empty_card}>
				There are no conditions currently active,
				please add a score parameter to begin

				<Button
					themeType="secondary"
					onClick={onClickAddCondition}
					style={{ marginTop: '16px' }}
				>
					+ Condition
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.card_container}>
			<div className={styles.cards}>
				<div className={styles.button_container}>
					{editMode ? (
						<>
							<Button
								themeType="secondary"
								onClick={() => setEditMode(false)}
								disabled={editLoading}
							>
								Cancel
							</Button>

							<Button
								themeType="primary"
								type="submit"
								size="md"
								style={{ marginLeft: '8px' }}
								onClick={handleSubmit(onSave)}
								disabled={editLoading}
							>
								Save
							</Button>
						</>
					)
						: <Button themeType="secondary" onClick={() => setEditMode(!editMode)}>Edit</Button>}
				</div>

				{expertiseLoading ? <LoadingState />
					: list.map((item) => (
						<CardItem
							editMode={editMode}
							item={item}
							control={control}
						/>
					)) }

				<div className={styles.condition_button_container}>
					<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
				</div>
			</div>
		</div>

	);
}

export default ExpertiseParameters;
