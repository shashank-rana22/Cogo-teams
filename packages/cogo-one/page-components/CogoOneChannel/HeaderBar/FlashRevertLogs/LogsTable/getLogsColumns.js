import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFilter } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getLogsColumns = () => {
	const handleClickFilter = () => {

	};

	return [
		{
			id     : 'sid',
			Header : () => (
				<div>
					SID No.
				</div>
			),
			accessor: (values) => (
				<div className={styles.sid_container}>
					{values.sid}
				</div>
			),
		},
		{
			id       : 'shipment_type',
			Header   : 'Shipment Type',
			accessor : (values) => (
				<div>
					{startCase(values.shipment_type)}
				</div>
			),
		},
		{
			id       : 'business_name',
			Header   : 'Business Name',
			accessor : (values) => (
				<div>
					{values.business_name}
				</div>
			),
		},
		{
			id       : 'reverted_by',
			Header   : 'Reverted By',
			accessor : (values) => (
				<div>
					{values.reverted_by}
				</div>
			),
		},
		{
			id     : 'flashed_at',
			Header : () => (
				<div>
					Flashed At
					<IcMFilter onClick={() => handleClickFilter('flashed_at')} />
				</div>
			),
			accessor: (values) => (
				<div>
					{formatDate({
						date       : values?.flashed_at,
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
			Header   : 'Reverted At',
			accessor : (values) => (
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
