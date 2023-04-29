import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useRemoveEngagementScoringConfiguration from '../../../../hooks/useRemoveEngagementScoringConfiguration';

import styles from './styles.module.css';

function TitleComponent({
	item, editMode = '', activeCollapse = '', refetch,
}) {
	const { engagement_type } = item;

	const { onDelete } = useRemoveEngagementScoringConfiguration({ refetch });

	return (
		<div className={styles.title_container}>
			<div className={styles.engagement_type}>{startCase(engagement_type)}</div>
			{activeCollapse === engagement_type
				? (
					<div>
						{editMode === engagement_type ? (
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
									Delete
								</Button>
							</div>
						) : (
							null
						)}
					</div>
				) : null }

		</div>
	);
}

export default TitleComponent;
