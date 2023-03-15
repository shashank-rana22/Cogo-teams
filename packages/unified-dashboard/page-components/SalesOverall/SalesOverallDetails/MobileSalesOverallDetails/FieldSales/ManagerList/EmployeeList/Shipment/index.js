import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';

import PortPair from './PortPair';
import serviceMileStone from './serviceMileStone.json';
import styles from './styles.module.css';

function Shipment({ itemData = {} }) {
	const { push } = useRouter();
	return (
		<div className={styles.card_wrapper}>
			<div
				className={styles.row}
				onClick={() => push(`/shipments/${itemData.id}`)}
				role="button"
				tabIndex="0"
			>
				<div className={styles.revenue_col}>
					{formatDate({
						date       : itemData.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>

				<div className={styles.revenue_col}>
					{itemData.shipping_line
						? itemData.shipping_line?.business_name
						: itemData.airline?.business_name}
				</div>
				<div className={styles.revenue_col}>
					{itemData.shipment_type}
				</div>
				<div className={styles.revenue_col}>
					<PortPair
						item={itemData}
						field={{
							label     : 'Port pair',
							key       : '',
							pair_type : 'shipment_type',
							func      : 'renderPortPair',
						}}
					/>
				</div>
				<div className={styles.revenue_col}>
					{itemData?.importer_exporter?.business_name}
				</div>
				<div className={styles.revenue_col}>
					{itemData?.booking_reference_number || '-'}
				</div>
				<div className={styles.revenue_col}>
					{formatDate({
						date       : itemData.schedule_arrival,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' - ',
					})}
				</div>
				<div className={styles.revenue_col}>
					{formatDate({
						date       : itemData.schedule_departure,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' - ',
					})}
				</div>
				<div className={styles.revenue_col}>
					{serviceMileStone[itemData.shipment_type]?.options.find(
						(x) => x.value === itemData.service_state,
					)?.label || 'Shipment received'}
				</div>
			</div>
		</div>
	);
}

export default Shipment;
