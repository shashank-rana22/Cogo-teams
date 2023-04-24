import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TitleCard({
	item = {},
	containerDetails = 0,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.display_card}>
				<div className={styles.details}>
					<div className={styles.title_container}>
						<div className={styles.document_type}>
							{item?.bl_document_type === 'draft_bill_of_lading' ? 'MBL' : 'HBL'}
							&nbsp;
							{startCase(item?.status)}
							{ containerDetails?.length !== 0 ? ':' : null }
						</div>

						{containerDetails?.length !== 0
							? (
								<div className={styles.ontrack}>
									{`${startCase(containerDetails?.length)} ${
										containerDetails?.length === 1 ? 'container' : 'containers'
									} on track`}
								</div>
							)

							: null }

						{item?.containers_rolled_over ? (
							<div className={styles.roll_over}>
								,{' '}
								{startCase(item?.containers_rolled_over)}{' '}
								rolled over
							</div>
						) : null}
					</div>
				</div>

				<div className={styles.bl_number}>
					BL Number:&nbsp;
					<span>{item?.bl_number}</span>
				</div>
			</div>

		</div>
	);
}

export default TitleCard;
