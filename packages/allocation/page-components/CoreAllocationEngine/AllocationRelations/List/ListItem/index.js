import { Pill, Tooltip } from '@cogoport/components';
import { format, getByKey, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COLUMNS_MAPPING = [
	{
		key      : 'business_name',
		label    : 'Business Name',
		getValue : (item) => {
			const businessName = getByKey(item, 'organization.business_name', '___');
			return (
				<Tooltip content={startCase(businessName.toLowerCase())} placement="bottom">
					<div className={styles.text}>{startCase(businessName.toLowerCase()) || '-'}</div>
				</Tooltip>
			);
		},
		flex: 1.25,
	},
	{
		key      : 'user',
		label    : 'User',
		getValue : (item) => {
			const name = getByKey(item, 'user_id.name');
			const email = getByKey(item, 'user_id.email');

			return (
				<div className={styles.name_container}>
					<div className={styles.text}>{startCase((name || '').toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{(email || '').toLowerCase()}
					</div>
				</div>
			);
		},
		flex: 1,
	},
	{
		key      : 'stakeholder_name',
		label    : 'Stakeholder Name',
		getValue : (item) => {
			const stakeholderType = getByKey(item, 'stakeholder_type', '___');
			const stakeholderName = getByKey(item, 'stakeholder_id.name', '___');

			const STAKEHOLDER_COLOR_MAPPING = {
				ckam              : 'orange',
				sales_agent       : 'blue',
				credit_controller : 'red',

			};

			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className={styles.text}>{startCase(stakeholderName.toLowerCase())}</div>

					<div className={styles.lower_label}>
						{stakeholderType
							? (
								<Pill
									size="sm"
									color={STAKEHOLDER_COLOR_MAPPING[stakeholderType]}
									style={{ marginLeft: '0px' }}
								>
									{startCase(stakeholderType)}
								</Pill>
							) : ''}

					</div>
				</div>
			);
		},
		flex: 1,
	},
	{
		key      : 'reason',
		label    : 'Reason',
		getValue : (item) => (
			<Tooltip placement="bottom" content={getByKey(item, 'reason', '___')}>
				<div className={styles.text}>{getByKey(item, 'reason', '___')}</div>
			</Tooltip>
		),
		flex: 1,
	},
	{
		key      : 'created_by',
		label    : 'Created by',
		getValue : (item) => (
			<div className={styles.name_container}>
				<div className={styles.text}>

					{getByKey(item, 'created_by.name', '___')}
				</div>
			</div>
		),
		flex: 1,
	},
	{
		key      : 'expiry_date',
		label    : 'Expiry Date',
		getValue : (item) => (getByKey(item, 'expiry_date')
			? format(getByKey(item, 'expiry_date'), 'dd MMM yyyy') : '___'),
		flex: 0.75,
	},
	{
		key      : 'status',
		label    : 'Status',
		getValue : (item) => {
			const className = item.status === 'active' ? 'active' : 'inactive';
			return (
				<div className={className}>
					{item.status ? startCase(item.status) : '-'}
				</div>
			);
		},
		flex: 1,
	},
	{
		key      : 'relation_type',
		label    : 'Relation Type',
		getValue : (item) => (
			<Pill size="sm" color={item.relation_type === 'remove' ? 'red' : 'green'}>
				{item.relation_type ? startCase(item.relation_type) : '-'}
			</Pill>
		),
		flex: 1,
	},
	// {
	//     key: 'action',
	//     label: 'action',
	//     getValue: (item) => {
	//         const
	//     }
	// }
];
function ListItem({ item }) {
	return (
		<div className={styles.list_item_container}>
			{COLUMNS_MAPPING.map((column) => {
				const { key, label, getValue, flex } = column;

				const value = getValue(item);

				return (
					<div key={key} className={styles.content_container} style={{ flex }}>
						{label ? <div className={styles.label}>{label}</div> : null}

						<div className={styles.value}>{value}</div>
					</div>

				);
			})}

		</div>
	);
}
export default ListItem;
