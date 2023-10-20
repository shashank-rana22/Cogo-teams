import { Checkbox, Tooltip, Pill, Avatar } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	pending   : 'orange',
	failed    : 'red',
	paid      : 'green',
	approved  : 'green',
	processed : 'green',
};

function GetStatus(employee) {
	if (employee?.status === null) {
		return '-';
	}

	return (
		<Pill color={COLOR_MAPPING[employee?.status]} size="md">
			{startCase(employee?.status)}
		</Pill>
	);
}

const getColumns = ({
	handleAllSelect, handleSelectId, list, selectedItems,
}) => {
	const columns = [
		{
			Header: () => {
				const checked = (list || []).every((item) => {
					if (selectedItems[item.id]) {
						return true;
					} return false;
				});
				return (
					<Checkbox
						checked={checked}
						onChange={(e) => handleAllSelect(e)}
					/>
				);
			},
			accessor: (item) => (

				<div className={styles.checkbox_container}>
					<div>
						<Checkbox
							checked={selectedItems[item.id] && item.status === 'pending'}
							onChange={(e) => handleSelectId(e, item)}
							disabled={item.status !== 'pending'}
						/>
					</div>

				</div>
			),
			id: 'select_all',
		},
		{
			Header   : 'NAME',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={<div className={styles.tooltip_data}>{`${item.name}( ${item.employee_code})`}</div>}
				>
					<div className={styles.data_name}>
						<div className={styles.avatar}>
							<Avatar personName={item.name} />
						</div>
						<div>
							{`${item.name}(${item.employee_code})` || '-'}
						</div>
					</div>
				</Tooltip>
			),
			id: 'name',
		},
		{
			Header   : 'DEPARTMENT',
			accessor : (item) => (
				<div
					className={styles.data}

				>
					{item.department || '-'}
				</div>
			),
			id: 'department',
		},
		{
			Header   : 'REPORTING OFFICE',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{item.reporting_location || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.reporting_location || '-'}
					</div>
				</Tooltip>
			),
			id: 'reporting_office',
		},
		{
			Header   : 'TYPE',
			accessor : (item) => item.employee_type || '-',
			id       : 'type',
		},
		{
			Header   : 'MONTHLY CTC',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{Math.round(item?.monthly_ctc) || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{Math.round(item?.monthly_ctc) || '-'}
					</div>
				</Tooltip>
			),
			id: 'monthly_ctc',
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (
				// <div>{item.status}</div>
				<div>
					{ GetStatus(item) }
				</div>
			),
			id: 'status',
		},

	];

	// const checkBoxColumn = [
	// 	{
	// 		Header: <Checkbox
	// 			checked={dataArr.length === selectedIds.length}
	// 			onChange={(e) => handleAllSelect(e)}
	// 		/>,
	// 		accessor: (item) => (
	// 			<div className={styles.checkbox_container}>
	// 				<div>
	// 					<Checkbox
	// 						checked={selectedIds.includes(item.id)}
	// 						onChange={(e) => handleSelectId(e, item.id)}
	// 					/>
	// 				</div>
	// 				<Avatar personName={item.name} />
	// 			</div>
	// 		),
	// 		id: 'select_all',
	// 	},
	// ];

	return [...columns];
};

export default getColumns;
