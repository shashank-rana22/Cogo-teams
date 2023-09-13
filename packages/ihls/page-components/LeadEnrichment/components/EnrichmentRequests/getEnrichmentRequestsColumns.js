import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const getEnrichmentRequestsColumns = ({
	setLogId = () => {},
}) => [
	{
		Header   : 'ACTIVITY',
		key      : 'activity',
		id       : 'activity',
		accessor : ({ activity }) => (
			<div className={styles.table_cell}>
				{activity || '___'}
			</div>
		),
	},
	{
		Header   : 'ASSIGNED ACCOUNTS',
		key      : 'assigned_accounts',
		id       : 'assigned_accounts',
		accessor : ({ assigned_accounts, id }) => (
			<div className={styles.table_cell}>
				<div>
					{assigned_accounts || '___'}
				</div>
				<Button onClick={() => setLogId(id)} themeType="tertiary" className={styles.button_eye}>
					<IcMEyeopen className={styles.eye_open} />
					View
				</Button>
			</div>
		),
	},
	{
		Header   : 'AGENCY',
		key      : 'agency',
		id       : 'agency',
		accessor : ({ agency }) => (
			<div className={styles.table_cell}>
				{agency || '___'}
			</div>
		),
	},
	{
		Header   : 'ASSIGN DATE',
		key      : 'assign_date',
		id       : 'assign_date',
		accessor : ({ assign_date }) => (
			<section className={styles.table_cell}>
				{assign_date ? format(assign_date, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : 'ASSIGNED BY',
		key      : 'assigned_by',
		id       : 'assigned_by',
		accessor : ({ assigned_by }) => (
			<div className={styles.table_cell}>
				{assigned_by || '___'}
			</div>
		),
	},
];

export default getEnrichmentRequestsColumns;
