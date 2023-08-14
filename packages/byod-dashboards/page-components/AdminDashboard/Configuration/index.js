import { Button, RadioGroup, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';
import EmptyState from '../EmptyState';

import AccessoriesModal from './AccessoriesModal';
import DepartmentModal from './DepartmentModal';
import DeviceModal from './DeviceModal';
import getAccessoriesInfoColumns from './getAccessoriesInfoColumns';
import getDeviceInfoColumns from './getDeviceInfoColumns';
import getReimbursementColumns from './getReimbursementColumns';
import styles from './styles.module.css';

const OPTIONS = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
];

const REIMBURSEMENT_DATA = [
	{ department: 'Technology', designation: 'SDE1' },
	{ department: 'Product', designation: 'APM' },
	{ department: 'Design', designation: 'X' },
];

const DEVICE_INFO_DATA = [
	{ name: 'macbook', reimbursement_percentage: 75, max_amount: 60000 },
	{ name: 'windows_laptop', reimbursement_percentage: 65, max_amount: 50000 },
];

const ACCESSORIES_INFO_DATA = [
	{ name: 'printer', reimbursement_percentage: 75, max_amount: 6000 },
	{ name: 'headset', reimbursement_percentage: 65, max_amount: 5000 },
];

function Configuration() {
	const [showAddDept, setShowAddDept] = useState(false);
	const [showAccessories, setShowAccessories] = useState(false);
	const [showDevice, setShowDevice] = useState(false);
	const [showModal, setShowModal] = useState('');

	const [departmentValue, setDepartmentValue] = useState('');
	const [designationValue, setDesignationValue] = useState([]);

	const [reimbusableValue, setReimbusableValue] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [deviceValue, setDeviceValue] = useState('');
	const [accessoriesValue, setAccessoriesValue] = useState('');

	const [combinedValue, setCombinedValue] = useState('');

	const deviceInfoColumns = getDeviceInfoColumns({
		showModal,
		setShowModal,
		setReimbusableValue,
		reimbusableValue,
		setMaxAmount,
		maxAmount,
		deviceValue,
		setDeviceValue,
		setShowDevice,
		showDevice,
	});
	const accessoriesInfoColumns = getAccessoriesInfoColumns({
		showModal,
		setShowModal,
		setReimbusableValue,
		reimbusableValue,
		setMaxAmount,
		maxAmount,
		accessoriesValue,
		setAccessoriesValue,
		setShowAccessories,
		showAccessories,
	});

	const reimbursementColumns = getReimbursementColumns();

	return (
		<div className={styles.main_container}>
			<div className={styles.title_container}>
				Configuration
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
							onClick={() => setShowAddDept(true)}
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
							/>
						)}
					</div>

					{isEmpty(REIMBURSEMENT_DATA) ? (<EmptyState emptyText="No Reimbursement Data Found" />)
						: (<StyledTable data={REIMBURSEMENT_DATA} columns={reimbursementColumns} />)}
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
							/>
						)}
					</div>

					<div style={{ margin: '10px' }}>
						{isEmpty(DEVICE_INFO_DATA) ? (<EmptyState emptyText="No Device Data Found" />)
							: (<StyledTable data={DEVICE_INFO_DATA} columns={deviceInfoColumns} />)}
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
							/>
						)}
					</div>

					<div style={{ margin: '10px' }}>
						{isEmpty(ACCESSORIES_INFO_DATA) ? (<EmptyState emptyText="No Accessories Data Found" />)
							: (<StyledTable data={ACCESSORIES_INFO_DATA} columns={accessoriesInfoColumns} />)}
					</div>
				</div>
			</div>
			<div className={styles.footer_container}>
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
				{combinedValue === 'yes' && (
					<div className={styles.combined_reimbusement}>
						<div className={styles.combined_reimbusement_body}>
							{/* <div className={styles.select_categories}>
								<div className={styles.text_container}>
									Select subcategories
								</div>

								<Select />
							</div>

							<div className={styles.select_categories}>
								<div className={styles.text_container}>
									% Reimbursable
								</div>

								<Input placeholder="% Reimbursable" />
							</div> */}

							<div className={styles.select_categories}>
								<div className={styles.text_container}>
									Max Reimbursement
								</div>

								<Input placeholder="Max Reimbursement" />
							</div>
						</div>

						{/* <StyledTable data={DEVICE_INFO_DATA} columns={deviceInfoColumns} /> */}
					</div>
				)}
				<Button style={{ marginLeft: '10px' }}> Save</Button>
			</div>
		</div>
	);
}
export default Configuration;
