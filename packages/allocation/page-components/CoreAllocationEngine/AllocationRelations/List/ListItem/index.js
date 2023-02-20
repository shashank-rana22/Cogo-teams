import { Checkbox, Popover, Pill, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';
import { useState } from 'react';

import ActionContent from './ActionContent';
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
		flex : 1.25,
		tab  : ['active', 'pending'],
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
		flex : 1.25,
		tab  : ['active', 'pending'],
	},
	{
		key      : 'stakeholder_name',
		label    : 'Stakeholder Name',
		getValue : (item) => {
			const stakeholderType = getByKey(item, 'stakeholder_type', '___');
			const stakeholderName = getByKey(item, 'stakeholder_id.name', '___');

			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className={styles.text}>{startCase(stakeholderName.toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{startCase(stakeholderType)}
					</div>

				</div>
			);
		},
		flex : 1,
		tab  : ['active', 'pending'],
	},
	{
		key      : 'reason',
		label    : 'Reason',
		getValue : (item) => (
			<Tooltip placement="bottom" content={getByKey(item, 'reason', '___')}>
				<div className={styles.reason_text}>{getByKey(item, 'reason', '___')}</div>
			</Tooltip>
		),
		flex : 1.0,
		tab  : ['active', 'pending'],
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
		flex : 1,
		tab  : ['active', 'pending'],
	},
	{
		key      : 'expiry_date',
		label    : 'Expiry Date',
		getValue : (item) => (
			<div className={styles.expiry_date}>
				<div>
					{getByKey(item, 'expiry_date')
						? format(getByKey(item, 'expiry_date'), 'dd MMM yyyy') : '___'}
				</div>

				<div className={styles.expiry_time}>
					{getByKey(item, 'expiry_date')
						? format(getByKey(item, 'expiry_date'), 'hh:mm aaa') : '___'}
				</div>
			</div>
		),
		flex : 0.75,
		tab  : ['active', 'pending'],
	},
	{
		key      : 'relation_type',
		label    : 'Relation Type',
		getValue : (item) => (
			<Pill size="sm" color={item.relation_type === 'remove' ? 'red' : 'green'}>

				{item.relation_type ? startCase(item.relation_type) : '-'}
			</Pill>
		),
		flex : 1,
		tab  : ['active'],
	},
];

function ListItem(props) {
	const {
		item,
		checkedRowsId = [],
		setCheckedRowsId = () => {},
		activeTab,
		setConfirmModalState = () => {},
	} = props;

	const itemId = `${item?.id}`;
	const isSelected = checkedRowsId.includes(itemId);

	const [showActions, setShowActions] = useState(false);

	const onCardClick = () => {
		if (!isSelected) {
			setCheckedRowsId([...checkedRowsId, itemId]);
		} else {
			setCheckedRowsId(checkedRowsId.filter((Id) => Id !== itemId));
		}
	};

	const onClickCta = (workflow) => {
		setShowActions(false);
		setConfirmModalState(() => ({
			type                  : workflow,
			relationData          : item,
			showConfirmationModal : true,
		}));
	};

	console.log('activeTab', activeTab);

	return (
		<div
			className={styles.list_item_container}
		>
			{activeTab === 'pending' && (
				<Checkbox
					label=""
					checked={isSelected}
					onChange={onCardClick}
					className={styles.bulk_select_checkbox}
				/>
			)}

			{COLUMNS_MAPPING.map((column) => {
				const { key, label, getValue, flex, tab } = column;

				const value = getValue(item);

				if (tab.includes(activeTab)) {
					return (
						<div key={key} className={styles.content_container} style={{ flex }}>
							{label ? <div className={styles.label}>{label}</div> : null}

							<div className={styles.value}>{value}</div>
						</div>

					);
				}

				return null;
			})}

			<div className={styles.content_container}>
				<Popover
					placement="left"
					interactive
					visible={showActions}
					render={(
						<ActionContent
							activeTab={activeTab}
							onClickCta={onClickCta}
						/>
					)}
					onClickOutside={() => setShowActions(false)}
				>

					<div className={styles.svg_container}>
						<IcMOverflowDot height={16} width={16} onClick={() => setShowActions(!showActions)} />
					</div>
				</Popover>
			</div>

		</div>
	);
}
export default ListItem;
