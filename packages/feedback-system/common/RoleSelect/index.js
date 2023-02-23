import { Select } from '@cogoport/components';

import { deptControls } from '../../hooks/useGetDepartmentControls';

import styles from './styles.module.css';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

function RoleSelect({ value = '', department = 'technology', setValue = () => {}, type = 'select' }) {
	const roleControl = deptControls.find((control) => control.name
    === DEPARTMENT_MAPPING[department]);

	const setDeptFilters = (val) => {
		setValue((pv) => ({ ...pv, page: 1, filters: { ...(pv.filters), work_scope: val } }));
	};

	function SelectComponent({ control = {} }) {
		if (type === 'controller') {
			return (
				<div className={styles.controller}>
					<span>{control.label}</span>
					<Select
						placeholder={control.placeholder}
						value={value}
						onChange={setDeptFilters}
						options={control.options}
					/>
				</div>
			);
		}
		return (
			<Select
				placeholder={control.placeholder}
				value={value}
				onChange={setDeptFilters}
				options={control.options}
			/>
		);
	}
	return (
		<div className={styles.control_container}>
			<SelectComponent
				control={roleControl}
			/>
		</div>
	);
}

export default RoleSelect;
