import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PACKAGE_CONSTANTS from '../../../../common/packageConstants';
import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

function RenderEmployees({ item, tooltip_data }) {
	const { min_length, start_index, end_index } = tooltip_data || {};

	return (
		<div className={styles.pill_box}>
			{item?.employees
				?.slice(start_index, end_index)
				.map((singleEmployee) => (
					<Pill key={singleEmployee?.name} size="md" className={styles.pill}>
						{startCase(singleEmployee?.name)}
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
						styles={{
							marginBottom : '24px',
							width        : 'fit-content',
							height       : '200px',
						}}
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
			Header   : 'SUB CHAPTER NAME',
			accessor : (item) => <div>{startCase(item?.sub_chapter_name) || '-'}</div>,
		},
		{
			Header   : 'SUB CHAPTER LEADER',
			accessor : (item) => (
				<div>{startCase(item?.sub_chapter_leader?.name) || '-'}</div>
			),
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
					{formatDate({
						date       : item?.updated_at,
						formatType : 'date',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					})}
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
