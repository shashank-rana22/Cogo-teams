import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { RenderFlashedAt, RenderShipmentType } from './renderTableHeaders';
import styles from './styles.module.css';

const getLogsColumns = (props) => {
	const { filtersParams } = props;
	console.log('setFilterParams:', filtersParams);

	return [
		{
			id     : 'sid',
			Header : () => (
				<div className={styles.title}>SID No.</div>
			),
			accessor: (values) => (
				<div className={styles.sid_container}>
					{values?.shipment_details?.serial_id}
				</div>
			),
		},
		{
			id       : 'shipment_type',
			Header   : <RenderShipmentType {...props} />,
			accessor : (values) => (
				<div>
					{startCase(values?.shipment_details?.shipment_type)}
				</div>
			),
		},
		{
			id     : 'business_name',
			Header : () => (
				<div className={styles.title}>Business Name</div>
			),
			accessor: (values) => (
				<div>
					{values?.service_provider?.business_name}
				</div>
			),
		},
		{
			id     : 'reverted_by',
			Header : () => (
				<div className={styles.title}>Reverted By</div>
			),
			accessor: (values) => (
				<div>
					{values.reverted_by}
				</div>
			),
		},
		{
			id       : 'flashed_at',
			Header   : <RenderFlashedAt {...props} />,
			accessor : (values) => (
				<div>
					{formatDate({
						date       : values?.created_at,
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			),
		},
		{
			id     : 'reverted_at',
			Header : () => (
				<div className={styles.title}>Reverted At</div>
			),
			accessor: (values) => (
				<div>
					{formatDate({
						date       : values?.reverted_at,
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
