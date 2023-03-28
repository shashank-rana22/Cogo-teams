import { Checkbox, Pill } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import ActionButton from './ActionButton';
import styles from './styles.module.css';

export const STATUS_MAPPING = {
	request_created: {
		color       : 'blue',
		buttonLabel : 'Deactivate Request',
	},
	response_received: {
		color       : 'green',
		buttonLabel : 'View Response',
	},
	deactivated: {
		color       : 'red',
		buttonLabel : null,
	},
};

export const REQUEST_COLUMNS = ({
	checkedRow = '',
	onChangeBodyCheckbox = () => {},
}) => [
	{
		id       : 'checkbox',
		key      : 'checkbox',
		Header   : ' ',
		accessor : ({ id = '' }) => (
			<div>
				<Checkbox
					checked={checkedRow === id}
					onChange={(event) => onChangeBodyCheckbox(event, id)}
				/>
			</div>
		),
	},
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
		accessor : ({ organization = '' }) => (
			<section className={styles.table_cell}>
				{organization || '___'}
			</section>
		),
	},
	{
		Header   : <div>CREATION DATE</div>,
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : <div>RESPONSE DATE</div>,
		key      : 'response_date',
		id       : 'response_date',
		accessor : ({ response_date }) => (
			<section className={styles.table_cell}>
				{response_date ? format(response_date, 'dd MMM yyyy') : '___'}
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
					{startCase(status) || 'Status not found'}
				</Pill>
			</section>
		),
	},
	{
		Header   : <div> </div>,
		key      : 'action',
		id       : 'action',
		accessor : ({
			status = '', organization = '', organization_id = '',
		}) => (
			<section className={styles.feedback}>
				{status !== 'deactivated' ? (
					<ActionButton
						status={status}
						label={STATUS_MAPPING[status]?.buttonLabel}
						organization={organization}
						organization_id={organization_id}
					/>
				) : (
					null
				)}
			</section>
		),
	},
];
