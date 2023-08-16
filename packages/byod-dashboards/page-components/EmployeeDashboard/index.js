import { Button } from '@cogoport/components';
import {
	useForm, InputController, SelectController, DatepickerController, UploadController,
} from '@cogoport/forms';
// import { useSelector } from '@cogoport/store';
import React, { useEffect } from 'react';

import EmployeeData from '../../common/EmployeeData';
import Spinner from '../../common/Spinner';
import useCreateInvoice from '../../hooks/useCreateDeviceDetail';
import useGetEmployeeData from '../../hooks/useGetEmployeeData';
// import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import { DEVICE_OPTIONS, VENDOR_NAME_OPTIONS } from '../../utils/constant';

import styles from './styles.module.css';

function EmployeeDashboard() {
	// const { user = {} } = useSelector((state) => state.profile);

	// const { id: user_id } = user;

	// const { loading : dataLoading } = useGetEmployeeDetails(user_id, true);
	const { createDeviceDetail, loading } = useCreateInvoice();
	const { data : employeeData, loading : employeeDataLoading } = useGetEmployeeData();

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			current_device_status: 'retain',
		},
	});

	const formValues = watch();

	const handleForm = (values) => {
		createDeviceDetail(values);
	};

	const { vendor_name, device_type } = formValues;

	useEffect(() => {
		setValue('vendor_name', '');
		setValue('other_vendor_name', '');
	}, [device_type, setValue]);

	if (employeeDataLoading) return <div className={styles.spinner_container}><Spinner /></div>;

	return (
		<div className={styles.main_container}>
			<div className={styles.title}>Employee BYOD Form</div>

			<EmployeeData data={employeeData} />

			<form onSubmit={handleSubmit(handleForm)}>
				<div className={styles.heading}>Apply for Device :</div>
				<div className={styles.container}>
					<div className={styles.controller}>
						<div className={styles.label}>Device Type</div>
						<SelectController
							control={control}
							name="device_type"
							size="md"
							placeholder="Device type"
							rules={{ required: true }}
							options={DEVICE_OPTIONS}
						/>
						{errors.device_type && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Serial ID Number</div>
						<InputController
							control={control}
							name="serial_id"
							size="md"
							placeholder="Serial ID"
							rules={{ required: true }}
						/>
						{errors.serial_id && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Invoice Date</div>
						<DatepickerController
							name="invoice_date"
							control={control}
							rules={{ required: true }}
							placeholder="Select Date"
							isPreviousDaysAllowed
						/>
						{errors.invoice_date && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Vendor Name</div>
						<SelectController
							control={control}
							name="vendor_name"
							size="md"
							placeholder="Vendor Name"
							rules={{ required: true }}
							options={VENDOR_NAME_OPTIONS}
						/>
						{errors.vendor_name && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					{vendor_name === 'other' && (
						<div className={styles.controller}>
							<div className={styles.label}>Other Vendor Name</div>
							<InputController
								control={control}
								name="other_vendor_name"
								size="md"
								placeholder="Other Vendor Name"
								rules={{ required: true }}
							/>
							{errors.other_vendor_name && (
								<div className={styles.error}>Required</div>
							)}
						</div>
					)}
				</div>

				<div className={styles.amount_heading}>Amount :</div>

				<div className={styles.amount_container}>
					<div className={styles.amount_sub_container}>
						<div className={styles.label}>Invoice Amount - GST in INR</div>
						<InputController
							control={control}
							name="invoice_amount"
							size="md"
							type="number"
							placeholder="Invoice Amount or 0"
							prefix="INR"
							rules={{ required: true }}
						/>
						{errors.invoice_amount && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.amount_sub_container}>
						<div className={styles.label}>Invoice</div>
						<UploadController
							name="invoice_url"
							control={control}
							size="sm"
							rules={{ required: true }}
						/>
						{errors.invoice_url && (
							<div className={styles.error}>Required</div>
						)}
					</div>
				</div>

				<Button type="submit" disabled={loading} size="md">Submit</Button>
			</form>
		</div>
	);
}

export default EmployeeDashboard;
