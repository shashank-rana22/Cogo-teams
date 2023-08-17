import { Button, RadioGroup, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import StyledTable from '../../../common/StyledTable';
import useGetEmployeeReimbursementGroup from '../../../hooks/useGetEmployeeReimbursementGroup';
import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';
import EmptyState from '../EmptyState';

import AccessoriesModal from './AccessoriesModal';
import DepartmentModal from './DepartmentModal';
import DeviceModal from './DeviceModal';
import getAccessoriesInfoColumns from './getAccessoriesInfoColumns';
import getDeviceInfoColumns from './getDeviceInfoColumns';
import getReimbursementColumns from './getReimbursementColumns';
import SetReimbursement from './SetMaxReimbursement';
import styles from './styles.module.css';

const OPTIONS = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
];

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

	const [combinedValue, setCombinedValue] = useState('');
	const [maxReimbursementAmount, setMaxReimbursementAmount] = useState('');

	const { data:getData = {}, getEmployeeReimbursementGroup } = useGetEmployeeReimbursementGroup();
	const { detail, mappings } = getData || {};
	const { id, addon_details, device_details, maximum_reimbursement_amount } = detail || {};

	const { updateDeviceDetails } = useUpdateDeviceDetails({ SOURCE: 'maxreimbursement', id });

	const deviceInfoColumns = getDeviceInfoColumns({
		setReimbusableValue,
		setMaxAmount,
		setDeviceValue,
		setShowDevice,
		id,
		device_details,
		getEmployeeReimbursementGroup,
	});
	const accessoriesInfoColumns = getAccessoriesInfoColumns({
		setReimbusableValue,
		setMaxAmount,
		setAccessoriesValue,
		setShowAccessories,
		id,
		addon_details,
		getEmployeeReimbursementGroup,
	});

	const reimbursementColumns = getReimbursementColumns({ mappings, id, getEmployeeReimbursementGroup });

	useEffect(() => {
		setMaxReimbursementAmount(maximum_reimbursement_amount);
		if (maximum_reimbursement_amount !== null) {
			setCombinedValue('yes');
		}
	}, [maximum_reimbursement_amount]);

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
							/>
						)}
					</div>

					{isEmpty(mappings) ? (<EmptyState emptyText="No Reimbursement Data Found" />)
						: (<StyledTable data={mappings} columns={reimbursementColumns} />)}
					<hr />
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

					<div className={styles.header_container}>
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
			/>
			{/* <div className={styles.footer_container}>
				<div className={styles.set_combined_reimbusement}>
					<div className={styles.text_container}>
						Do you want to set combined maximum reimbursement ?
					</div>

					<RadioGroup
						style={{ marginTop: '-10px' }}
						options={OPTIONS}
						onChange={(e) => setCombinedValue(e)}
						value={combinedValue}
					/>
				</div>
				{(combinedValue === 'yes') && (
					<div className={styles.combined_reimbusement}>
						<div className={styles.combined_reimbusement_body}>

							<div className={styles.select_categories}>
								<div className={styles.text_container}>
									Max Reimbursement
								</div>
								<Input
									placeholder="Max Reimbursement"
									onChange={(val) => setMaxReimbursementAmount(parseFloat(val))}
									value={maxReimbursementAmount}
									type="number"
								/>
							</div>
						</div>
					</div>
				)}
				<Button
					style={{ marginLeft: '10px' }}
					onClick={() => updateDeviceDetails({ maxReimbursementAmount })}
				>
					{' '}
					Save

				</Button>
			</div> */}
		</div>
	);
}
export default Configuration;
