import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const DEFAULT_CUSTOM_ORG = 0;

const columnsMapping = [
	{
		key      : 'updated_at',
		label    : 'Last updated on',
		getValue : (data) => formatDate({
			date       : data?.updated_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		span: 3,
	},
	{
		key      : 'last_updated_by',
		label    : 'Last updated by',
		getValue : (data) => data?.last_updated_by || '___',
		span     : 3,
	},
	{
		key      : 'custom_org_config_count',
		label    : 'Custom configuration Organizations',
		getValue : (data) => (
			<div className={styles.custom_config}>
				{startCase(data?.custom_org_config_count) || DEFAULT_CUSTOM_ORG}
			</div>
		),
		span: 3,
	},
	{
		key      : 'status',
		label    : 'Status',
		getValue : (data) => startCase(data?.status) || '___',
		span     : 1.5,
	},
];

export default columnsMapping;
