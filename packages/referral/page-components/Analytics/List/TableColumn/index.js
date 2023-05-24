import { Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import NodeColumns from '../NodeColumns';

import styles from './styles.module.css';

function TableColumns({ listType = '' }) {
	const columns = [
		{
			Header   : 'NETWORK NAME',
			accessor : (item = {}) => (
				<div className={styles.tooltip_content}>
					<Tooltip content={startCase('Cogoport')} placement="bottom">
						<div className={styles.user_name}>
							{startCase(item?.user_name)}
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
		{
			Header   : 'LEVELS',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.level}
				</div>
			),
			conditions: ['network'],
		},
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
					{item?.user_count}
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
					<IcMOverflowDot />
					{/* <ShowButtons
						item={item}
					/> */}
				</div>
			),
			conditions: ['network', 'users'],
		},
	];
	return columns.filter((itm) => itm?.conditions.includes(listType));
}

export default TableColumns;
