import { Input, Select } from '@cogoport/components';
import { useDebounceQuery, SelectController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getDepartmentControls from '../../hooks/useGetDepartmentControls';
import useGetControls from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';
import { getFieldController } from '../Form/getFieldController';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {}, source = '' }) {
	const { Department = '', Designation = '' } = params;
	// const [managerName, setManagerName] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	// const managerControls = useGetControls({ name: 'manager_name' });
	const managerControls = useGetControls(['manager_name']);

	const monthControls = getMonthControls(params.Year, params.Month);

	const { watch, control } = useForm();
	const { department, designation, manager_name } = watch();

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

	useEffect(() => {
		debounceQuery(manager_name);
	}, [debounceQuery, manager_name]);

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
				// <Input
				// 	{...managerControls}
				// 	onChange={setManagerName}
				// 	style={{ marginRight: '8px' }}
				// />
				managerControls.map((cntrl) => {
					const Element = getFieldController(cntrl.type) || null;

					if (!Element) return null;

					return (

						<Element
							{...cntrl}
							control={control}
							key={cntrl.name}
							id={`${cntrl.name}_input`}
							style={{ marginRight: '8px' }}
						/>
					);
				})
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
