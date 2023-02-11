import { Button, Select } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import { deptControls } from '../../utils/departmentControls';

import styles from './styles.module.css';

function DepartmentSelect({
	value = '',
	setValue = () => {},
	type = 'controller',
}) {
	const departmentControl = deptControls.find((control) => control.name === 'department');

	const setDeptFilters = (val) => {
		setValue((pv) => ({ ...pv, filters: { ...(pv.filters), department: val }, page: 1 }));
	};

	const resetDeptFilters = () => {
		setValue((pv) => ({
			...pv,
			page    : 1,
			filters : {
				...(pv.filters),
				department : undefined,
				work_scope : undefined,
			},
		}));
	};

	const deptFiltersApplied = !!value;

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
			{type === 'select' && (
				<Button
					size="lg"
					style={{ marginRight: 10 }}
					themeType="secondary"
					onClick={() => resetDeptFilters()}
					disabled={!deptFiltersApplied}
				>
					<IcMRefresh />
				</Button>
			)}

			<SelectComponent
				control={departmentControl}
			/>
		</div>
	);
}

export default DepartmentSelect;
