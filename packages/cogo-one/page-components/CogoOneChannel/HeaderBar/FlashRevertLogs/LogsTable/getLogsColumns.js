import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { RenderFlashedAt, RenderShipmentType } from './renderTableHeaders';
import styles from './styles.module.css';

const getLogsColumns = (props) => {
	const { filtersParams, reverted_shipments } = props;
	console.log('setFilterParams:', filtersParams);

	return [
		{
			id       : 'sid',
			Header   : () => <div className={styles.title}>SID No.</div>,
			accessor : (value) => (
				// const isIdRevertedShipment = reverted_shipments.includes(value?.shipment_details?.serial_id);
				<div className={cl`${styles.sid_container}
				 ${reverted_shipments.includes(value?.shipment_details?.serial_id)
					? styles.shipment_id
					: ''}`}
				>
					{/* {value?.data?.shipment_serial_id} */}
					{value?.shipment_details?.serial_id}
				</div>
			),
		},
		{
			id       : 'shipment_type',
			Header   : <RenderShipmentType {...props} />,
			accessor : (value) => (
				<div>
					{startCase(value?.service_type)}
				</div>
			),
		},
		{
			id       : 'business_name',
			Header   : () => <div className={styles.title}>Business Name</div>,
			accessor : (value) => (
				<div>
					{value?.service_provider?.business_name}
				</div>
			),
		},
		{
			id       : 'reverted_by',
			Header   : () => <div className={styles.title}>Reverted By</div>,
			accessor : (value) => (value?.is_reverted ? (
				<div>{value.reverted_by}</div>
			) : (
				''
			)),
		},
		{
			id       : 'flashed_at',
			Header   : <RenderFlashedAt {...props} />,
			accessor : (value) => (
				<div>
					{formatDate({
						date       : value?.created_at,
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			),
		},
		{
			id       : 'reverted_at',
			Header   : () => <div className={styles.title}>Reverted At</div>,
			accessor : (value) => (
				<div>
					{formatDate({
						date       : value?.reverted_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			),
		},
	];
};

export default getLogsColumns;
