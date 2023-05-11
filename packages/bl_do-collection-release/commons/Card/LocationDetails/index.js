import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

export default function LocaionDetails({ item = {}, stateProps = {} }) {
	const isFclLocal = stateProps.shipment_type === 'fcl_freight_local';

	return (
		<div className={styles.container}>
			<div className={styles.col}>
				<div className={styles.left}>
					<div className={styles.grey}>{isFclLocal && item?.trade_type === 'import' ? 'POD' : 'POL'}</div>
					<Tooltip
						animation="shift-away"
						content={
							isFclLocal ? item.port?.display_name : item.freight_service?.origin_port?.display_name
						}
					>
						<div className={cl`${styles.port_code} ${styles.primary} ${styles.sm}`}>
							{isFclLocal ? item?.port?.port_code : item.freight_service?.origin_port?.port_code}
						</div>
					</Tooltip>
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>ETD</div>
					{formatDate({
						date       : item.freight_service?.schedule_departure,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}

				</div>
			</div>
			<div className={styles.col}>
				{!isFclLocal
					? (
						<div className={styles.left}>
							<div className={styles.grey}>POD</div>
							<Tooltip
								animation="shift-away"
								content={item.freight_service?.destination_port?.display_name}
							>
								<div className={cl`${styles.port_code} ${styles.primary} ${styles.sm}`}>
									{item.freight_service?.destination_port?.port_code}
								</div>
							</Tooltip>

						</div>
					) : null}
				<div className={styles.right}>
					<div className={styles.grey}>ETA</div>
					{formatDate({
						date       : item.freight_service?.schedule_arrival,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}
