import { Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

import { STATUS_MAPPING } from '../../../constants/get-status-mapping';

import ActionButton from './ActionButton';
import styles from './styles.module.css';

export const getRequestColumns = ({ refetch = () => {} }) => [
	{
		Header   : 'Serial ID',
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ serial_id }) => (
			<Pill size="md">
				#
				{serial_id || '___'}
			</Pill>
		),
	},
	{
		Header   : 'THIRD PARTY',
		key      : 'third_party',
		id       : 'third_party',
		accessor : ({ user_id }) => (
			<section className={styles.table_cell}>
				{user_id?.name || '___'}
			</section>
		),
	},
	{
		Header   : 'CREATION DATE',
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : 'RESPONSE DATE',
		key      : 'response_date',
		id       : 'response_date',
		accessor : ({ updated_at, status = '' }) => (
			<section className={styles.table_cell}>
				{status === 'responded' && updated_at ? format(updated_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : 'STATUS',
		key      : 'status',
		id       : 'status',
		accessor : ({
			status = '',
		}) => (
			<Pill
				size="md"
				color={STATUS_MAPPING[status]?.color}
			>
				{STATUS_MAPPING[status]?.status || 'Nil'}
			</Pill>
		),
	},
	{
		Header   : '',
		key      : 'action',
		id       : 'action',
		accessor : ({
			status = '', user_id, id = '', organization, lead_organization, lead_organization_id,
		}) => (
			<section className={styles.feedback}>
				{status !== 'inactive' ? (
					<ActionButton
						label={STATUS_MAPPING[status]?.buttonLabel}
						status={status}
						organization={lead_organization_id ? (
							lead_organization?.business_name
						) : (
							organization?.business_name
						)}
						third_party={user_id?.name}
						feedback_request_id={id}
						refetch={refetch}
					/>
				) : (
					null
				)}
			</section>
		),
	},
];
