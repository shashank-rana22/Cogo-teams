import { Modal, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import React from 'react';

import useCreateDepartmentRole from '../../../hooks/useCreateDepartmentRole';

import styles from './styles.module.css';

function DepartmentModal({
	setShowAddDept = () => {},
	source,
	showAddDept,
	departmentValue,
	designationValue,
	setDepartmentValue = () => {},
	setDesignationValue = () => {},
	id,
	getEmployeeReimbursementGroup = () => {},
}) {
	const { createDepartmentRoleReimbursement, btnloading } = useCreateDepartmentRole({
		departmentValue,
		designationValue,
		id,
		setShowAddDept,
		getEmployeeReimbursementGroup,

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
				<div className={styles.modal_body}>
					<div>
						<div className={styles.text_container}>Select Department</div>

						<AsyncSelect
							placeholder="Select Department"
							value={departmentValue}
							onChange={(val) => setDepartmentValue(val)}
							isClearable
							initialCall
							asyncKey="list_employee_departments"
						/>
					</div>

					<div>
						<div className={styles.text_container}>Select Designation</div>

						<AsyncSelect
							placeholder="Select Role"
							value={designationValue}
							onChange={(val) => setDesignationValue(val)}
							isClearable
							initialCall
							asyncKey="list_employee_roles"
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
