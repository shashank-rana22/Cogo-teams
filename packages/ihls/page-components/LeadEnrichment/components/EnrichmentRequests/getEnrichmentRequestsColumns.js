import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEyeopen } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const getEnrichmentRequestsColumns = ({
	setLogId = () => {},
}) => [
	{
		Header   : 'NAME',
		key      : 'name',
		id       : 'name',
		accessor : ({ name }) => (
			<div className={styles.table_cell}>
				{name || '___'}
			</div>
		),
	},
	{
		Header   : 'ENRICHMENT STATUS',
		key      : 'enrichment_status',
		id       : 'enrichment_status',
		accessor : ({ enrichment_status }) => (
			<div className={styles.table_cell}>
				{enrichment_status || '___'}
			</div>
		),
	},
	{
		Header   : 'ACCOUNTS',
		key      : 'total_accounts',
		id       : 'total_accounts',
		accessor : ({ total_accounts, id }) => (
			<div className={styles.table_cell}>
				<div>
					{total_accounts || '___'}
				</div>
				<Button onClick={() => setLogId(id)} themeType="tertiary" className={styles.button_eye}>
					<IcMEyeopen className={styles.eye_open} />
					View
				</Button>
			</div>
		),
	},
	{
		Header   : 'SOURCE',
		key      : 'source',
		id       : 'source',
		accessor : ({ source }) => (
			<div className={styles.table_cell}>
				{source || '___'}
			</div>
		),
	},
	{
		Header   : 'ASSIGN DATE',
		key      : 'assign_date',
		id       : 'assign_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) : '___'}
			</section>
		),
	},
	{
		Header   : 'ASSIGNED BY',
		key      : 'assigned_by',
		id       : 'assigned_by',
		accessor : ({ performed_by_id }) => (
			<div className={styles.table_cell}>
				{performed_by_id || '___'}
			</div>
		),
	},
];

export default getEnrichmentRequestsColumns;
