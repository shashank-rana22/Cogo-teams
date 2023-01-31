import { Badge, Tooltip } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const columnsMapping = [
	{
		key      : 'id',
		label    : 'Serial Id',
		getValue : (data) => <Badge color="blue" size="lg" text={getByKey(data, 'service.serial_id', '___')} />,
		flex     : 2,
	},
	{
		key      : 'service_type',
		label    : 'Organization',
		getValue : (data) => (
			getByKey(data, 'service.business_name', '___')
		),
		flex: 2.5,
	},
	{
		key      : 'service_user',
		label    : 'User',
		getValue : (data) => (
			<div>
				{getByKey(data, 'service_user.name', '___')}
				<div className={styles.email_id}>{getByKey(data, 'service_user.email', '___')}</div>
			</div>
		),
		flex: 3,
	},
	{
		key      : 'stakeholder_type',
		label    : 'Stakeholder Type',
		getValue : (data) => startCase(getByKey(data, 'stakeholder_type', '___')),
		flex     : 2.5,
	},
	{
		key      : 'requested_agent',
		label    : 'Requested Agent',
		getValue : (data) => (
			<div>
				{getByKey(data, 'user.name', '___')}
				{' '}
				<div className={styles.email_id}>{getByKey(data, 'user.email', '___')}</div>
			</div>
		),
		flex: 3,
	},
	{
		key      : 'created_by',
		label    : 'Requested By',
		getValue : (data) => getByKey(data, 'created_by.name', '___'),
		flex     : 2.5,
	},
	{
		key      : 'reason',
		label    : 'Reason',
		getValue : (data) => (
			<Tooltip content={getByKey(data, 'reason', '___')} placement="top">
				<p className={styles.reason}>
					{getByKey(data, 'reason', '___')}
				</p>
			</Tooltip>
		),
		flex: 2.5,
	},
	{
		key      : 'action',
		label    : 'Action',
		getValue : () => {},
		flex     : 2,
	},
];

function ListItem(props) {
	const { data } = props;

	return (
		<div className={styles.list_item_container}>
			{columnsMapping.map((columnDetails) => {
				const { key, flex, label, getValue } = columnDetails;

				const value = getValue(data);

				return (
					<div key={key} className={styles.content_container} style={{ flex }}>
						{label ? <div className={styles.label}>{label}</div> : null}

						<div className={styles.value}>
							{value}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ListItem;
