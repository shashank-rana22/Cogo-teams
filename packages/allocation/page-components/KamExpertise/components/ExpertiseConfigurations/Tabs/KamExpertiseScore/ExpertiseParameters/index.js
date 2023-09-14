import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useEditExpertiseParameters from '../../../../../hooks/useEditExpertiseParameters';
import useGetExpertiseParameters from '../../../../../hooks/useGetExpertiseParameters';

import CardItem from './CardItem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ExpertiseParameters(props) {
	const { t } = useTranslation(['allocation']);

	const { onClickAddCondition, activeCollapse = '', cardRefetch } = props;

	const [editMode, setEditMode] = useState(false);

	const { listExpertiseParams, expertiseRefetch, expertiseLoading } = useGetExpertiseParameters(activeCollapse);
	const { list = [] } = listExpertiseParams || {};

	const {
		onSave,
		handleSubmit,
		control,
		loading: editLoading,
	} = useEditExpertiseParameters({ list, expertiseRefetch, setEditMode, cardRefetch, t });

	if (isEmpty(list) && !expertiseLoading) {
		return (
			<div className={styles.empty_card}>
				{t('allocation:no_condition_currently_active_phrase')}

				<Button
					themeType="secondary"
					onClick={onClickAddCondition}
					style={{ marginTop: '16px' }}
				>
					+
					{' '}
					{t('allocation:condition_label')}
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
								{t('allocation:cancel_button')}
							</Button>

							<Button
								themeType="primary"
								type="submit"
								size="md"
								style={{ marginLeft: '8px' }}
								onClick={handleSubmit(onSave)}
								disabled={editLoading}
							>
								{t('allocation:save_button')}
							</Button>
						</>
					)
						: (
							<Button themeType="secondary" onClick={() => setEditMode(!editMode)}>
								{t('allocation:edit_button')}
							</Button>
						)}
				</div>

				{expertiseLoading ? <LoadingState />
					: list.map((item) => (
						<CardItem
							key={item?.group_name}
							editMode={editMode}
							item={item}
							control={control}
						/>
					)) }

				<div className={styles.condition_button_container}>
					<Button themeType="secondary" onClick={onClickAddCondition}>
						+
						{' '}
						{t('allocation:condition_label')}
					</Button>
				</div>
			</div>
		</div>

	);
}

export default ExpertiseParameters;
