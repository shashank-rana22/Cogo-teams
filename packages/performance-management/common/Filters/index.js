import { Input, Select } from '@cogoport/components';
import { useDebounceQuery, SelectController, useForm } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getDepartmentControls from '../../hooks/useGetDepartmentControls';
import useGetControls from '../../utils/filterControls';
import useListReassignControls from '../../utils/list-reassign-manager-controls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {}, source = '' }) {
	const { Department = '', Designation = '' } = params;
	const [managerName, setManagerName] = useState('');
	const [managerId, setManagerId] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const managerControls = useGetControls({ name: 'manager_name' });
	const statusControls = useGetControls({ name: 'status' });
	// const managerControls = useGetControls(array);

	const monthControls = getMonthControls(params.Year, params.Month);

	const { watch, control } = useForm();

	const manager = watch('manager_id');
	const department = watch('department');
	const designation = watch('designation');
	const status = watch('status');

	const cogoUsersControl = useListReassignControls();

	useEffect(() => setManagerId(manager), [manager]);

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val, Page: 1 });
	};

	useEffect(() => {
		setParams({
			...params,
			Q           : query || undefined,
			Department  : department || undefined,
			Designation : designation || undefined,
			LogType     : status || undefined,
			Page        : 1,
			ManagerID   : managerId || undefined,
		});
	}, [query, department, designation, status, managerId]);

	useEffect(() => {
		debounceQuery(managerName);
	}, [debounceQuery, managerName]);

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

			{source === 'hr_pip_dashboard' && (
				<>
					<SelectController
						{...cogoUsersControl}
						style={{ marginRight: '8px' }}
						control={control}
						placeholder="Manager..."
						isClearable
					/>
					<SelectController
						{...statusControls}
						control={control}
						style={{ marginRight: '8px' }}
					/>
					<div className={styles.container}>
						<Input
							{...managerControls}
							onChange={setManagerName}
							placeholder="Search by Name/COGO-ID..."
							style={{ marginRight: '8px' }}
							suffix={<IcMSearchlight style={{ marginRight: '16px' }} />}
						/>
					</div>
				</>

			)}

			{source === 'hr_kpi_dashboard' && (
				<Input
					{...managerControls}
					onChange={setManagerName}
					style={{ marginRight: '8px' }}
				/>
				// managerControls.map((cntrl) => {
				// 	const Element = getFieldController(cntrl.type) || null;
				// 	const value = startCase(cntrl.name);

			// 	if (!Element) return null;

			// 	return (

			// 		<Element
			// 			{...cntrl}
			// 			control={control}
			// 			key={cntrl.name}
			// 			id={`${cntrl.name}_input`}
			// 			style={{ marginRight: '8px' }}
			// 		/>
			// 	);
			// })
			)}

			{source !== 'hr_pip_dashboard' && monthControls.map((cntrl) => {
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
