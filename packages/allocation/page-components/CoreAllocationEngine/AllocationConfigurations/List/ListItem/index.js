import { Pill } from '@cogoport/components';
import { format, getByKey, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const columnsMapping = [
	{
		key      : 'schedule_type',
		label    : 'Schedule Type',
		getValue : (item) => startCase(getByKey(item, 'schedule_type', '___')),
		flex     : 1,
	},
	{
		key      : 'segment_type',
		label    : 'Segment',
		getValue : (item) => startCase(getByKey(item, 'segment_type', '___')),
		flex     : 1,
	},
	{
		key      : 'roles',
		label    : 'Roles',
		getValue : (item) => {
			const roles = getByKey(item, 'roles', []); return (
				<Pill size="md" color="orange" style={{ margin: '0px' }}>
					{startCase(getByKey(roles, '[0].name', '___'))}
				</Pill>
			);
		},
		flex: 1,
	},
	{
		key      : 'stakeholder_type',
		label    : 'Stakeholder Type',
		getValue : (item) => startCase(getByKey(item, 'stakeholder_type', '___')),
		flex     : 1,
	},
	{
		key      : 'locking_criterion',
		label    : 'Locking Criterion',
		getValue : (item) => startCase(getByKey(item, 'locking_criterion', '___')),
		flex     : 1,
	},
	{
		key      : 'next_scheduled',
		label    : 'Next Scheduled',
		getValue : (item) => format(getByKey(item, 'allocation_schedule.next_run_at'), 'dd MM yyyy'),
		flex     : 1,
	},
	{
		key      : 'expiry_date',
		label    : 'Expiry Date',
		getValue : (item) => format(getByKey(item, 'end_date'), 'dd MM yyyy'),
		flex     : 1,
	},
];

function ListItem({ item }) {
	return (
		<div className={styles.list_item_container}>
			{columnsMapping.map((columnDetail) => {
				const { key, label, getValue, flex } = columnDetail;

				const value = getValue(item);

				return (
					<div key={key} className={styles.content_container} style={{ flex }}>
						<div className={styles.label}>{label}</div>

						<div className={styles.value}>{value}</div>
					</div>
				);
			})}
		</div>
	);
}

export default ListItem;
