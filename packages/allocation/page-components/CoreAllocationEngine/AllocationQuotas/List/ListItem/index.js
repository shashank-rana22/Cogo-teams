import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { getByKey, format } from '@cogoport/utils';
import { useState } from 'react';

import Actions from './Actions';
import styles from './styles.module.css';

// const LIST_COLUMNS_MAPPING = {
// 	role: {
// 		role             : 'Role',
// 		quota_attributes : 'Quota Attributes',
// 		created_by       : 'Created by',
// 		created_at       : 'Created at',
// 		action           : 'Action',
// 	},
// 	user: {
// 		user             : 'User',
// 		quota_attributes : 'Quota Attributes',
// 		created_by       : 'Created by',
// 		created_at       : 'Created at',
// 		action           : 'Action',
// 	},
// };
// make an array of strings

const columnsMapping = [
	{
		key      : 'role',
		label    : 'Role',
		getValue : (data) => (
			<div>
				{getByKey(data, 'role.name', '___')}
			</div>
		),
		flex: 2,
	},
	{
		key      : 'user',
		label    : 'User',
		getValue : (data) => (
			<div>
				{getByKey(data, 'user.name', '___')}
				<div className={styles.email_id}>{getByKey(data, 'user.email', '___')}</div>
			</div>
		),
		flex: 2,
	},
	{
		key      : 'created_by',
		label    : 'Created by',
		getValue : (data) => (
			<div>
				{getByKey(data, 'created_by.name', '___')}
				<div className={styles.email_id}>{getByKey(data, 'created_by.email', '___')}</div>
			</div>
		),
		flex: 2,
	},
	{
		key      : 'created_at',
		label    : 'Created At',
		getValue : (data) => (
			<div>
				{getByKey(data, 'created_at') ? (
					<div className={styles.created_date}>
						{format(getByKey(data, 'created_at'), 'dd MMM yyyy')}

						<div className={styles.created_time}>
							{format(getByKey(data, 'created_at'), 'hh:mm aaa')}
						</div>
					</div>
				) : null}
			</div>

		),
		flex: 2,
	},
];

function ListItem(props) {
	const { data, onClickStatusChange } = props;

	const [showPopover, setShowPopover] = useState(false);

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

			<div className={styles.content_container}>
				<Popover
					visible={showPopover}
					placement="left"
					interactive
					render={(
						<Actions onClickCta={() => {
							setShowPopover(false);
						}}
						/>
					)}
					onClickOutside={() => setShowPopover(false)}
				>
					<div
						className={styles.svg_container}
						onClick={() => setShowPopover(true)}
						role="presentation"
					>
						<IcMOverflowDot height={16} width={16} />
					</div>
				</Popover>
			</div>
		</div>
	);
}

export default ListItem;
