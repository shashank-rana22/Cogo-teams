import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetEmployeeReimbursementGroup from '../../../hooks/useGetEmployeeReimbursementGroup';
import EmptyState from '../EmptyState';
import StyledTable from '../StyledTable';

import AccessoriesModal from './AccessoriesModal';
import DepartmentModal from './DepartmentModal';
import DeviceModal from './DeviceModal';
import getAccessoriesInfoColumns from './getAccessoriesInfoColumns';
import getDeviceInfoColumns from './getDeviceInfoColumns';
import getReimbursementColumns from './getReimbursementColumns';
import SetReimbursement from './SetMaxReimbursement';
import styles from './styles.module.css';

function Configuration() {
	const [showAddDept, setShowAddDept] = useState(false);
	const [showAccessories, setShowAccessories] = useState(false);
	const [showDevice, setShowDevice] = useState(false);

	const [departmentValue, setDepartmentValue] = useState('');
	const [designationValue, setDesignationValue] = useState([]);

	const [reimbusableValue, setReimbusableValue] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [deviceValue, setDeviceValue] = useState('');
	const [accessoriesValue, setAccessoriesValue] = useState('');

	const [combinedValue, setCombinedValue] = useState('no');
	const [maxReimbursementAmount, setMaxReimbursementAmount] = useState(null);

	const { data:getData = {}, getEmployeeReimbursementGroup } = useGetEmployeeReimbursementGroup();
	const { detail, mappings } = getData || {};
	const { id, addon_details, device_details, maximum_reimbursement_amount } = detail || {};

	const deviceInfoColumns = getDeviceInfoColumns({
		setShowDevice, id, device_details, getEmployeeReimbursementGroup,
	});
	const accessoriesInfoColumns = getAccessoriesInfoColumns({
		setShowAccessories, id, addon_details, getEmployeeReimbursementGroup,
	});

	const reimbursementColumns = getReimbursementColumns({ mappings, id, getEmployeeReimbursementGroup });

	useEffect(() => {
		setMaxReimbursementAmount(maximum_reimbursement_amount);
		if (combinedValue === 'no') {
			setMaxReimbursementAmount(null);
		} else if (maximum_reimbursement_amount !== null) {
			setCombinedValue('yes');
		}
	}, [maximum_reimbursement_amount, combinedValue]);

	return (
		<div className={styles.main_container}>
			<div className={styles.title_container}>
				Configuration -
				{' '}
				{detail?.name}
			</div>
			<div className={styles.body_container}>
				<div className={styles.reimbursement_container}>
					<div className={styles.header_container}>
						<div className={styles.title}>
							<strong>Reimbursement Brackets</strong>
						</div>

						<Button
							themeType="secondary"
							style={{ marginTop: '10px' }}
							onClick={() => {
								setShowAddDept(true);
								setDepartmentValue('');
								setDesignationValue('');
							}}
						>
							Add Department
						</Button>

						{showAddDept && (
							<DepartmentModal
								showAddDept={showAddDept}
								setShowAddDept={setShowAddDept}
								departmentValue={departmentValue}
								setDepartmentValue={setDepartmentValue}
								designationValue={designationValue}
								setDesignationValue={setDesignationValue}
								source="Add Department"
								id={id}
								mappings={mappings}
								getEmployeeReimbursementGroup={getEmployeeReimbursementGroup}
							/>
						)}
					</div>

					{isEmpty(mappings) ? (<EmptyState emptyText="No Reimbursement Data Found" />)
						: (<StyledTable data={mappings} columns={reimbursementColumns} />)}
				</div>

				<div className={styles.device_info}>
					<div className={styles.title}>
						<strong>Device Information</strong>
					</div>

					<div className={styles.header_container}>
						<div className={styles.text_container}>
							<strong>Laptop & Computers</strong>
						</div>
						<Button
							onClick={() => {
								setReimbusableValue('');
								setMaxAmount('');
								setDeviceValue('');
								setShowDevice(true);
							}}
							themeType="secondary"
							style={{ marginRight: '20px' }}
						>
							Add Device
						</Button>

						{ showDevice && (
							<DeviceModal
								setReimbusableValue={setReimbusableValue}
								reimbusableValue={reimbusableValue}
								setMaxAmount={setMaxAmount}
								maxAmount={maxAmount}
								deviceValue={deviceValue}
								setDeviceValue={setDeviceValue}
								source="Add Device"
								showDevice={showDevice}
								setShowDevice={setShowDevice}
								id={id}
								device_details={device_details}
								getEmployeeReimbursementGroup={getEmployeeReimbursementGroup}
							/>
						)}
					</div>

					<div style={{ margin: '10px' }}>
						{isEmpty(device_details) ? (<EmptyState emptyText="No Device Data Found" />)
							: (<StyledTable data={device_details} columns={deviceInfoColumns} />)}
					</div>

					<div className={styles.header_container_accessories}>
						<div className={styles.text_container}>
							<strong>Computer Accessories</strong>
						</div>

						<Button
							onClick={() => {
								setShowAccessories(true);
								setReimbusableValue('');
								setMaxAmount('');
								setAccessoriesValue('');
							}}
							themeType="secondary"
							style={{ marginRight: '20px' }}
						>
							Add Accessories
						</Button>

						{showAccessories && (
							<AccessoriesModal
								setShowAccessories={setShowAccessories}
								showAccessories={showAccessories}
								setReimbusableValue={setReimbusableValue}
								reimbusableValue={reimbusableValue}
								setMaxAmount={setMaxAmount}
								maxAmount={maxAmount}
								accessoriesValue={accessoriesValue}
								setAccessoriesValue={setAccessoriesValue}
								source="Add Accessories"
								id={id}
								addon_details={addon_details}
								getEmployeeReimbursementGroup={getEmployeeReimbursementGroup}
							/>
						)}
					</div>

					<div style={{ margin: '10px' }}>
						{isEmpty(addon_details) ? (<EmptyState emptyText="No Accessories Data Found" />)
							: (<StyledTable data={addon_details} columns={accessoriesInfoColumns} />)}
					</div>
				</div>
			</div>
			<SetReimbursement
				setCombinedValue={setCombinedValue}
				combinedValue={combinedValue}
				maxReimbursementAmount={maxReimbursementAmount}
				setMaxReimbursementAmount={setMaxReimbursementAmount}
				id={id}
				getEmployeeReimbursementGroup={getEmployeeReimbursementGroup}
			/>
		</div>
	);
}
export default Configuration;
