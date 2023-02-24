import { Select } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getDepartmentControls from '../../hooks/useGetDepartmentControls';
import useGetControls from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {} }) {
	const { Department = '', Designation = '' } = params;

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const managerControls = useGetControls({ name: 'manager_id' });
	const monthControls = getMonthControls(params.Year, params.Month);

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

			{monthControls.map((cntrl) => {
				const value = startCase(cntrl.name);
				if (['year', 'month'].includes(cntrl.name)) {
					return (
						<Select
							{...cntrl}
							key={cntrl.name}
							value={params[value]}
							onChange={(val) => setFilter(val, value)}
							placeholder={`Select ${value}`}
							style={{ marginRight: '8px' }}
							options={cntrl.options}
						/>
					);
				}
				return null;
			})}
		</div>
	);
}

export default Filters;
