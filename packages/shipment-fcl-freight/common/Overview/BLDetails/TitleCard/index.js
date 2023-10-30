import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
							{' '}
							{startCase(item?.status)}
							{ containerDetails?.length !== GLOBAL_CONSTANTS.zeroth_index ? ':' : null }
						</div>

						{containerDetails?.length !== GLOBAL_CONSTANTS.zeroth_index
							? (
								<div className={styles.ontrack}>
									{`${startCase(containerDetails?.length)} ${
										containerDetails?.length === GLOBAL_CONSTANTS.one ? 'container' : 'containers'
									} on track`}
								</div>
							)

							: null }

						{item?.containers_rolled_over ? (
							<div className={styles.roll_over}>
								,
								{' '}
								{startCase(item?.containers_rolled_over)}
								{' '}
								rolled over
							</div>
						) : null}
					</div>
				</div>
				{primary_service?.trade_type === 'import' && item?.bl_document_type === 'draft_bill_of_lading'
					&& item?.collection_mode ? (
						<div>
							MBL Collection Mode:
							{' '}
							{startCase(item?.collection_mode?.replace(/_/g, ' '))}
						</div>
					) : null}

				<div className={styles.bl_number}>
					BL Number:
					{' '}
					<b>
						{item?.bl_number}
					</b>
				</div>
			</div>

		</div>
	);
}

export default TitleCard;
