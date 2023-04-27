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

								{/* <Button
									size="md"
									themeType="secondary"
									style={{ marginLeft: '16px' }}
									onClick={(e) => {
										e.stopPropagation();
										setEditMode('');
									}}
								>
									Cancel

								</Button>

								<Button
									size="md"
									themeType="primary"
									style={{ marginLeft: '16px', marginRight: '28px' }}
									onClick={handleSubmit(handleSave)}
								>
									Save
								</Button> */}

							</div>
						) : (
							null
							// <Button
							// 	size="md"
							// 	themeType="secondary"
							// 	onClick={(e) => {
							// 		e.stopPropagation();
							// 		setEditMode(engagement_type);
							// 	}}
							// 	style={{ marginLeft: '16px', marginRight: '28px' }}
							// >
							// 	<IcMEdit style={{ marginRight: '8px' }} />

						// 	Edit
						// </Button>
						)}
					</div>
				) : null }

		</div>
	);
}

export default TitleComponent;
