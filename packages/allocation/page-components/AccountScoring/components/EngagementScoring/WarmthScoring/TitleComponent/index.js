import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useRemoveEngagementScoringConfiguration from '../../../../hooks/useRemoveEngagementScoringConfiguration';

import styles from './styles.module.css';

function TitleComponent({
	item,
	editMode = '',
	activeCollapse = '',
	refetch,
}) {
	const { t } = useTranslation(['allocation']);

	const { engagement_type } = item;

	const { onDelete } = useRemoveEngagementScoringConfiguration({ refetch, t });

	return (
		<div className={styles.title_container}>
			<div className={styles.engagement_type}>{startCase(engagement_type)}</div>

			{activeCollapse === engagement_type && editMode === engagement_type
				? (

					<div className={styles.title_buttons}>
						<Button
							size="md"
							themeType="tertiary"
							style={{ marginRight: '20px' }}
							onClick={(e) => {
								e.stopPropagation();
								onDelete(engagement_type);
							}}
						>
							<IcMDelete style={{ marginRight: '8px' }} />
							{t('allocation:delete_button')}
						</Button>
					</div>

				) : null }

		</div>
	);
}

export default TitleComponent;
