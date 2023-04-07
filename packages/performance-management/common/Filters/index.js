import { Input, Select } from '@cogoport/components';
import { useDebounceQuery, SelectController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getDepartmentControls from '../../hooks/useGetDepartmentControls';
import useGetControls from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {}, source = '' }) {
	const { Department = '', Designation = '' } = params;
	const [managerName, setManagerName] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const managerControls = useGetControls({ name: 'manager_name' });
	const monthControls = getMonthControls(params.Year, params.Month);

	const { watch, control } = useForm();
	const department = watch('department');
	const designation = watch('designation');

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val, Page: 1 });
	};

	useEffect(() => {
		setParams({
			...params,
			Q           : query || undefined,
			Department  : department || undefined,
			Designation : designation || undefined,
			Page        : 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, department, designation]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => debounceQuery(managerName), [managerName]);

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

			{source === 'hr_dashboard' && (
				<Input
					{...managerControls}
					onChange={setManagerName}
					style={{ marginRight: '8px' }}
				/>
			)}

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
