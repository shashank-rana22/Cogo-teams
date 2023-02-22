import { Select } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import { deptControls as departmentControls } from '../../utils/departmentControls';
import useGetControls from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

function Filters({ params = {}, setParams = () => {} }) {
	const deptControls = departmentControls.find((control) => control.name === 'department');

	const roleControls = params.Department ? departmentControls.find((control) => control.name
	=== DEPARTMENT_MAPPING[params.Department]) : {};

	const managerControls = useGetControls().find((control) => control.name === 'manager_id');
	const monthControls = getMonthControls(params.Year);

	const { watch, control: managerControl = {} } = useForm();
	const manager = watch('manager_id');

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val, Page: 1 });
	};

	useEffect(() => {
		setParams({
			...params,
			ManagerID : manager || undefined,
			Page      : 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manager]);

	return (

		<div className={styles.department_select}>
			<Select
				value={params.Department}
				onChange={(val) => setFilter(val, 'Department')}
				options={deptControls.options}
				placeholder="Department..."
				style={{ marginRight: '8px' }}
				isClearable={!params.Designation}
			/>
			<Select
				value={params.Designation}
				onChange={(val) => setFilter(val, 'Designation')}
				options={roleControls.options}
				disabled={!params.Department}
				placeholder="Role..."
				style={{ marginRight: '8px' }}
				isClearable
			/>

			<SelectController
				{...managerControls}
				control={managerControl}
				style={{ marginRight: '8px' }}
			/>

			<Select
				value={params.Year}
				onChange={(val) => setFilter(val, 'Year')}
				placeholder="Select Year"
				style={{ marginRight: '8px' }}
				options={monthControls.year.options}
				isClearable={!params.Month}
			/>

			<Select
				value={params.Month}
				onChange={(val) => setFilter(val, 'Month')}
				disabled={!params.Year}
				placeholder="Select Month"
				style={{ marginRight: '8px' }}
				options={monthControls.month.options}
				isClearable
			/>
		</div>
	);
}

export default Filters;
