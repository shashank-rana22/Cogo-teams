import { Checkbox, Tooltip, Pill, Avatar, Popover } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	pending   : 'orange',
	failed    : 'red',
	paid      : 'green',
	approved  : 'green',
	processed : 'green',
	'on hold' : 'yellow',
};

function GetStatus(employee, handleChangeStatus) {
	if (employee?.status === null) {
		return '-';
	}
	if (employee?.status === 'pending' || employee?.status === 'on hold') {
		return (
			<Popover
				placement="bottom"
				render={(
					<div
						style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
						aria-hidden
						onClick={() => handleChangeStatus(employee)}
					>
						{' '}
						{employee?.status === 'pending' ? 'on hold' : 'pending'}

					</div>
				)}
			>
				<Pill color={COLOR_MAPPING[employee?.status]} size="md">
					{startCase(employee?.status)}
				</Pill>
			</Popover>
		);
	}

	return (
		<Pill color={COLOR_MAPPING[employee?.status]} size="md">
			{startCase(employee?.status)}
		</Pill>
	);
}

const getColumns = ({
	handleAllSelect, handleSelectId, list, selectedItems, handleChangeStatus,
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
			Header   : 'PAYBAND',
			accessor : (item) => (
				<div
					className={styles.data}

				>
					{item?.salary_band_name || '-'}
				</div>
			),
			id: 'payband',
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (
				<div>
					{ GetStatus(item, handleChangeStatus) }
				</div>
			),
			id: 'status',
		},

	];
	return [...columns];
};

export default getColumns;
