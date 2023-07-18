import { Popover, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';

import ListButtons from '../../../../../utils/renderButtonData';
import InviteColumns from '../InviteColumns';
import NodeColumns from '../NodeColumns';
import SignedUpColumns from '../SignedUpColumns';

import styles from './styles.module.css';

function tableColumns({
	listType = '',
	setShowOptions = () => {},
	setShowActivityModal = () => {},
}) {
	const columns = [
		{
			Header   : 'NETWORK NAME',
			accessor : (item = {}) => (
				<div className={styles.tooltip_content}>
					<Tooltip
						content={startCase(getByKey(item.referee_data, 'name'))}
						placement="bottom"
					>
						<div className={styles.user_name}>
							{startCase(getByKey(item.referee_data, 'name'))}
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
					<Tooltip content={startCase(getByKey(item.referee_data, 'name'))} placement="bottom">
						<div className={styles.user_name}>{startCase(getByKey(item.referee_data, 'name'))}</div>
					</Tooltip>
				</div>
			),
			conditions: ['users'],
		},
		{
			Header   : 'USERS',
			accessor : (item = {}) => (
				<div className={styles.user_name}>{getByKey(item, 'total_child_count')}</div>
			),
			conditions: ['network'],
		},
		{
			Header   : 'INVITIES',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					<InviteColumns item={item} type="total_cogopoints" index={index} />
				</div>
			),
			conditions: ['users'],
		},
		{
			Header   : 'Signed Up',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					<SignedUpColumns item={item} type="total_cogopoints" index={index} />
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
						<IcMOverflowDot
							className={styles.dot_icon}
							onClick={() => setShowOptions(item)}
						/>
					</Popover>
				</div>
			),
			conditions: ['network', 'users'],
		},
	];
	return columns.filter((itm) => itm?.conditions.includes(listType));
}

export default tableColumns;
