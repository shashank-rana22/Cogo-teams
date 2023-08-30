import { Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

import { getStatusMapping } from '../../../constants/get-status-mapping';

import ActionButton from './ActionButton';
import styles from './styles.module.css';

export const getRequestColumns = ({ refetch = () => {}, t = () => {} }) => {
	const statusMapping = getStatusMapping({ t });

	return [
		{
			Header   : t('allocation:serial_id'),
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
			Header   : t('allocation:third_party'),
			key      : 'third_party',
			id       : 'third_party',
			accessor : ({ user_id }) => (
				<section className={styles.table_cell}>
					{user_id?.name || '___'}
				</section>
			),
		},
		{
			Header   : t('allocation:created_date'),
			key      : 'created_date',
			id       : 'created_date',
			accessor : ({ created_at }) => (
				<section className={styles.table_cell}>
					{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
				</section>
			),
		},
		{
			Header   : t('allocation:response_date'),
			key      : 'response_date',
			id       : 'response_date',
			accessor : ({ updated_at, status = '' }) => (
				<section className={styles.table_cell}>
					{status === 'responded' && updated_at ? format(updated_at, 'dd MMM yyyy') : '___'}
				</section>
			),
		},
		{
			Header   : t('allocation:status'),
			key      : 'status',
			id       : 'status',
			accessor : ({
				status = '',
			}) => (
				<Pill
					size="md"
					color={statusMapping[status]?.color}
				>
					{statusMapping[status]?.status || t('allocation:nill_value')}
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
							label={statusMapping[status]?.buttonLabel}
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
};
