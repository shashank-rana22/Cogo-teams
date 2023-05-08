import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import styles from './styles.module.css';

function TitleCard({
	item = {},
	containerDetails = [],
}) {
	const { primary_service } = useContext(ShipmentDetailContext);
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
								,
								&nbsp;
								{startCase(item?.containers_rolled_over)}
								&nbsp;
								rolled over
							</div>
						) : null}
					</div>
				</div>
				{primary_service?.trade_type === 'import' && item?.bl_document_type === 'draft_bill_of_lading'
					&& item?.collection_mode ? (
						<div>
							MBL Collection Mode:
							&nbsp;
							{startCase(item?.collection_mode?.replace(/_/g, ' '))}
						</div>
					) : null}

				<div className={styles.bl_number}>
					BL Number:&nbsp;
					<b>
						{item?.bl_number}
					</b>
				</div>
			</div>

		</div>
	);
}

export default TitleCard;
