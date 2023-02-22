import { Select } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getDepartmentControls from '../../utils/departmentControls';
import useGetControls from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {} }) {
	const { Department = '', Designation = '' } = params;

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const managerControls = useGetControls().find((control) => control.name === 'manager_id');
	const monthControls = getMonthControls(params.Year);

	const { watch, control } = useForm();
	const manager = watch('manager_id');
	const department = watch('department');
	const designation = watch('designation');

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val, Page: 1 });
	};

	useEffect(() => {
		setParams({
			...params,
			ManagerID   : manager || undefined,
			Department  : department || undefined,
			Designation : designation || undefined,
			Page        : 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manager, department, designation]);

	return (

		<div className={styles.department_select}>
			{departmentDesignationControls.map((cntrl) => (
				<SelectController
					{...cntrl}
					control={control}
					style={{ marginRight: '8px' }}
					key={cntrl.name}
				/>
			))}

			<SelectController
				{...managerControls}
				control={control}
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
