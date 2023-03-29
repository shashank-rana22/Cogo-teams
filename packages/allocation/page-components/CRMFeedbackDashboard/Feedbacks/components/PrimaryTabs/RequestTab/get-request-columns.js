import { Pill } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import ActionButton from './ActionButton';
import styles from './styles.module.css';

export const STATUS_MAPPING = {
	requested: {
		status      : 'Request Created',
		color       : 'blue',
		buttonLabel : 'Deactivate Request',
	},
	responded: {
		status      : 'Response Received',
		color       : 'green',
		buttonLabel : 'View Response',
	},
	inactive: {
		status      : 'Deactivated',
		color       : 'red',
		buttonLabel : null,
	},
	active: {
		status      : 'Active',
		color       : 'blue',
		buttonLabel : null,
	},
};

export const REQUEST_COLUMNS = [
	{
		Header   : <div>S. NO</div>,
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ serial_id = '' }) => (
			<section>
				#
				{serial_id || '___'}
			</section>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ user_id = '' }) => (
			<section className={styles.table_cell}>
				{user_id.name || '___'}
			</section>
		),
	},
	{
		Header   : <div>CREATION DATE</div>,
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at = '' }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : <div>RESPONSE DATE</div>,
		key      : 'response_date',
		id       : 'response_date',
		accessor : ({ updated_at = '', status = '' }) => (
			<section className={styles.table_cell}>
				{status === 'responded' && updated_at ? format(updated_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : <div>STATUS</div>,
		key      : 'status',
		id       : 'status',
		accessor : ({
			status = '',
		}) => (
			<section className={styles.view}>
				<Pill
					size="md"
					color={STATUS_MAPPING[status]?.color}
				>
					{STATUS_MAPPING[status]?.status || 'Status not found'}
				</Pill>
			</section>
		),
	},
	{
		Header   : <div> </div>,
		key      : 'action',
		id       : 'action',
		accessor : ({
			status = '', user_id = '', organization_id = '',
		}) => (
			<section className={styles.feedback}>
				{!status.includes(['inactive', 'active']) ? (
					<ActionButton
						label={STATUS_MAPPING[status]?.buttonLabel}
						status={status}
						organization={user_id.name}
						organization_id={organization_id}
					/>
				) : (
					null
				)}
			</section>
		),
	},
];
