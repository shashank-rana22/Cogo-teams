import { Pill, Tooltip } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formattedDate } from '../../../../common/formattedDate';
import PACKAGE_CONSTANTS from '../../../../common/packageConstants';
import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

function RenderEmployees({ item, tooltip_data }) {
	const { min_length, start_index, end_index } = tooltip_data || {};

	return 				(
		<div className={styles.pill_box}>
			{item?.employees
				?.slice(start_index, end_index)
				.map((singleEmplyee) => (
					<Pill key={singleEmplyee?.name} size="md" className={styles.pill}>
						{singleEmplyee?.name}
					</Pill>
				))}

			{item?.employees?.length > min_length ? (
				<Pill>
					<Tooltip
						content={<TooltipContent item={item?.employees} source="name" />}
						placement="right"
						theme="light"
						interactive
						caret
						styles={{ marginBottom: '24px' }}
					>
						+
						{item.employees.length - end_index}
						{' '}
						EMPLOYEES
					</Tooltip>
				</Pill>
			) : null}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowCreateModal, activeTab }) => {
	const { tooltip_data, default_active_tab } = PACKAGE_CONSTANTS || {};

	const columnArray = [
		{
			Header   : 'SQUAD NAME',
			accessor : (item) => <div>{item?.squad_name || '-'}</div>,
		},

		{
			Header   : 'SQUAD LEADER',
			accessor : (item) => <div>{startCase(item?.squad_leader?.name) || '-'}</div>,
		},

		{
			Header   : 'EMPLOYEES',
			accessor : (item) => (
				<RenderEmployees item={item} tooltip_data={tooltip_data} />
			),
		},

		{
			Header   : 'LAST UPDATED AT',
			accessor : (item) => (
				<div>
					{formattedDate(item?.updated_at, 'dd MMM yyyy')}
				</div>
			),
		},

		{
			Header   : 'STATUS',
			accessor : (item) => (
				<Pill
					className={item?.status === default_active_tab ? styles.active : styles.inactive}
				>
					{startCase(item?.status) || '-'}
				</Pill>
			),
		},
	];

	if (activeTab === default_active_tab) {
		return [...columnArray,
			{
				Header   : 'ACTION',
				accessor : (item) => (
					<div className={styles.button}>
						<IcMDelete
							width={16}
							height={16}
							style={{ cursor: 'pointer' }}
							onClick={() => setShowDeleteModal(item.id)}
						/>

						<IcMEdit
							width={16}
							height={16}
							style={{ marginLeft: 12, cursor: 'pointer' }}
							onClick={() => setShowCreateModal(item)}
						/>
					</div>
				),
			}];
	}
	return columnArray;
};

export default getColumns;