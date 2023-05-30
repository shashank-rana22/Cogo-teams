import { Popover, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ListButtons from '../../../../../utils/renderButtonData';
import NodeColumns from '../NodeColumns';

import styles from './styles.module.css';

function TableColumns({
	listType = '',
	showOptions = {},
	setShowOptions = () => {},
	setShowActivityModal,
}) {
	console.log('showOptions:', showOptions);
	const columns = [
		{
			Header   : 'NETWORK NAME',
			accessor : (item = {}) => (
				<div className={styles.tooltip_content}>
					<Tooltip content={startCase(item?.referrer_data?.name)} placement="bottom">
						<div className={styles.user_name}>
							{startCase(item?.referrer_data?.name) || 'NA'}
						</div>
					</Tooltip>
				</div>
			),
			conditions: ['network'],
		},
		{
			Header   : 'USER NAME',
			accessor : (item = {}) => (
				<div className={styles.tooltip_content}>
					<Tooltip content={startCase('Cogoport')} placement="bottom">
						<div className={styles.user_name}>
							{startCase(item?.user_name)}
						</div>
					</Tooltip>
				</div>
			),
			conditions: ['users'],
		},
		// {
		// 	Header   : 'LEVELS',
		// 	accessor : (item = {}) => (
		// 		<div className={styles.user_name}>
		// 			{item?.level}
		// 		</div>
		// 	),
		// 	conditions: ['network'],
		// },
		{
			Header   : 'Referrals',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.level}
				</div>
			),
			conditions: ['users'],
		},
		{
			Header   : 'USERS',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.total_child_count}
				</div>
			),
			conditions: ['network', 'users'],
		},
		{
			Header   : 'AFFILIATES',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					<NodeColumns item={item} type="total_cogopoints" index={index} />
				</div>
			),
			conditions: ['users'],
		},
		{
			Header   : 'TOTAL COGOPOINTS',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					<NodeColumns item={item} type="total_cogopoints" index={index} />
				</div>
			),
			conditions: ['network', 'users'],
		},
		{
			Header   : 'Expected Cogopoints',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					<NodeColumns item={item} type="expected_cogopoints" index={index} />
				</div>
			),
			conditions: ['network'],
		},
		{
			Header   : ' ',
			accessor : (item = {}) => (
				<div className={styles.show_details} key={item?.id}>
					<Popover
						// visible={showOptions?.id === item?.id}
						onClickOutside={() => setShowOptions({})}
						placement="left"
						render={(
							<ListButtons
								item={item}
								setShowActivityModal={setShowActivityModal}
								setShowOptions={setShowOptions}
							/>
						)}
					>
						<IcMOverflowDot className={styles.dot_icon} onClick={() => setShowOptions(item)} />
					</Popover>
				</div>
			),
			conditions: ['network', 'users'],
		},
	];
	return columns.filter((itm) => itm?.conditions.includes(listType));
}

export default TableColumns;
