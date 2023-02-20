import { Checkbox, Badge, Tooltip, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';
import { useState } from 'react';

import Actions from './Actions';
import styles from './styles.module.css';

const columnsMapping = [
	{
		key      : 'id',
		label    : 'Serial Id',
		getValue : (data) => (getByKey(data, 'service.serial_id')
			? <Badge color="blue" size="lg" text={getByKey(data, 'service.serial_id')} /> : '___'),
		flex: 1,
	},
	{
		key      : 'service_type',
		label    : 'Organization',
		getValue : (data) => (
			getByKey(data, 'service.business_name') || '___'
		),
		flex: 1.5,
	},
	{
		key      : 'service_user',
		label    : 'User',
		getValue : (data) => (
			<div>
				{getByKey(data, 'service_user.name')}
				<div className={styles.email_id}>{getByKey(data, 'service_user.email') || '___'}</div>
			</div>
		),
		flex: 2,
	},
	{
		key      : 'stakeholder_type',
		label    : 'Stakeholder Type',
		getValue : (data) => startCase(getByKey(data, 'stakeholder_type') || '___'),
		flex     : 1.5,
	},
	{
		key      : 'requested_agent',
		label    : 'Requested Agent',
		getValue : (data) => (
			<div>
				{getByKey(data, 'user.name', '')}
				{' '}
				<div className={styles.email_id}>{getByKey(data, 'user.email') || '___'}</div>
			</div>
		),
		flex: 2,
	},
	{
		key      : 'created_by',
		label    : 'Requested By',
		getValue : (data) => getByKey(data, 'created_by.name') || '___',
		flex     : 1.5,
	},
	{
		key      : 'reason',
		label    : 'Reason',
		getValue : (data) => (
			<Tooltip content={getByKey(data, 'reason', '___')} placement="top">
				<span className={styles.reason}>
					{getByKey(data, 'reason') || '___'}
				</span>
			</Tooltip>
		),
		flex: 1.5,
	},
];

function ListItem(props) {
	const {
		data,
		onClickStatusChange,
		isSelected,
		onCardClick,
	} = props;

	const [showPopover, setShowPopover] = useState(false);

	return (
		<div
			className={styles.container}
		>
			<Checkbox
				label=""
				checked={isSelected}
				onChange={onCardClick}
				className={styles.bulk_select_checkbox}
			/>

			{columnsMapping.map((columnDetails) => {
				const { key, flex, label, getValue } = columnDetails;

				const value = getValue(data);

				return (
					<div
						key={key}
						className={styles.content_container}
						style={{ flex }}
					>
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
						<Actions
							onClickCta={({ status }) => {
								onClickStatusChange({ status });
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
