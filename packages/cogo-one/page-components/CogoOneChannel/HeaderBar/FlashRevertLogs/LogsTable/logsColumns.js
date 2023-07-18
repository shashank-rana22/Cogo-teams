import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const logsColumns = () => [
	{
		Header   : 'SID No.',
		accessor : (values) => (
			<div className={styles.sid_container}>
				{values.sid}
			</div>
		),
	},
	{
		Header   : 'Shipment Type',
		accessor : (values) => (
			<div>
				{startCase(values.shipment_type)}
			</div>
		),
	},
	{
		Header   : 'Business Name',
		accessor : (values) => (
			<div>
				{values.business_name}
			</div>
		),
	},
	{
		Header   : 'Reverted By',
		accessor : (values) => (
			<div>
				{values.reverted_by}
			</div>
		),
	},
	{
		Header   : 'Flashed At',
		accessor : (values) => (
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

export default logsColumns;
