import { Select } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import { deptControls as departmentControls } from '../../utils/departmentControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

function Filters({ params = {}, setParams = () => {} }) {
	const deptControls = departmentControls.find((control) => control.name === 'department');

	const roleControls = params.filters?.department ? departmentControls.find((control) => control.name
	=== DEPARTMENT_MAPPING[params.filters?.department]) : {};

	const managerControls = getControls().find((control) => control.name === 'manager_id');
	const monthControls = getMonthControls(params.filters.created_at_year);

	const { watch, control: managerControl = {} } = useForm();
	const manager = watch('manager_id');

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	useEffect(() => {
		setParams({
			...params,
			filters: {
				...(params.filters || {}),
				manager_id: manager || undefined,
			},
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manager]);

	return (

		<div className={styles.department_select}>
			<Select
				value={params.filters?.department}
				onChange={(val) => setFilter(val, 'department')}
				options={deptControls.options}
				placeholder="Department..."
				style={{ marginRight: '8px' }}
				isClearable={!params.filters?.designation}
			/>
			<Select
				value={params.filters?.designation}
				onChange={(val) => setFilter(val, 'designation')}
				options={roleControls.options}
				disabled={!params.filters?.department}
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
				value={params.filters?.year}
				onChange={(val) => setFilter(val, 'year')}
				placeholder="Select Year"
				style={{ marginRight: '8px' }}
				options={monthControls.year.options}
				isClearable={!params.filters?.month}
			/>

			<Select
				value={params.filters?.month}
				onChange={(val) => setFilter(val, 'month')}
				disabled={!params.filters?.year}
				placeholder="Select Month"
				style={{ marginRight: '8px' }}
				options={monthControls.month.options}
				isClearable
			/>
		</div>
	);
}

export default Filters;
