import { Modal, Select, Button, MultiSelect } from '@cogoport/components';
import React from 'react';

import useCreateDepartmentRole from '../../../hooks/useCreateDepartmentRole';

import styles from './styles.module.css';

const DEPARTMENT_OPTIONS = [
	{ value: 'technology', label: 'Technology' },
	{ value: 'product', label: 'Product' },
	{ value: 'bussiness', label: 'Bussiness' },
];

const DESIGNATION_OPTIONS = [
	{ value: 'sde1', label: 'SDE1' },
	{ value: 'sde2', label: 'SDE2' },
	{ value: 'lead_engineer', label: 'LEAD ENGINEER' },
];

function DepartmentModal({
	setShowAddDept,
	source,
	showAddDept,
	departmentValue,
	designationValue,
	setDepartmentValue,
	setDesignationValue,
	id,
}) {
	const { createDepartmentRoleReimbursement, btnloading } = useCreateDepartmentRole({
		departmentValue,
		designationValue,
		id,
	});
	return (
		<Modal
			size="md"
			closeOnOuterClick
			show={showAddDept}
			onClose={() => setShowAddDept(false)}
			placement="center"
		>
			<Modal.Header title={source} />
			<Modal.Body>
				<div>
					<div>
						<div className={styles.text_container}>Select Department</div>

						<Select
							options={DEPARTMENT_OPTIONS}
							value={departmentValue}
							onChange={(val) => setDepartmentValue(val)}
						/>
					</div>

					<div>
						<div className={styles.text_container}>Select Designation</div>

						<MultiSelect
							options={DESIGNATION_OPTIONS}
							value={designationValue}
							onChange={(val) => setDesignationValue(val)}
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button loading={btnloading} onClick={() => createDepartmentRoleReimbursement()}>save</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default DepartmentModal;
