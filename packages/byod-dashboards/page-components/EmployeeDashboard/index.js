import { Button } from '@cogoport/components';
import {
	useForm, InputController, SelectController, DatepickerController, UploadController,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import React, { useEffect } from 'react';

import DeviceDetails from '../../common/DeviceDetails';
import EmployeeData from '../../common/EmployeeData';
import Spinner from '../../common/Spinner';
import useCreateInvoice from '../../hooks/useCreateDeviceDetail';
import useGetEmployeeData from '../../hooks/useGetEmployeeData';
import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import {
	DEVICE_OPTIONS, WARRANTY, getVendorNameOptions,
} from '../../utils/constant';

import styles from './styles.module.css';

function EmployeeDashboard() {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id } = user;

	const { data, loading : dataLoading, refetch } = useGetEmployeeDetails(user_id, true);
	const { createDeviceDetail, loading } = useCreateInvoice(refetch);
	const { data : employeeData, loading : employeeDataLoading } = useGetEmployeeData();

	const { employee_device_detail } = data || {};

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

	if (dataLoading || employeeDataLoading) {
		return (
			<div className={styles.spinner_container}>
				<Spinner />
			</div>
		);
	}

	if (data) {
		return (
			<>
				<div className={styles.title}>Employee BYOD Form</div>
				<EmployeeData data={employeeData} />
				<DeviceDetails deviceData={employee_device_detail} className="device_details" />
			</>
		);
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.title}>Employee BYOD Form</div>
			<EmployeeData data={employeeData} />
			<form onSubmit={handleSubmit(handleForm)}>
				<div className={styles.heading}>Apply for Device :</div>
				<div className={styles.container}>
					<div className={styles.controller}>
						<div className={styles.label}>Device type</div>
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
							name="device_serial_id"
							size="md"
							placeholder="Serial ID"
							rules={{ required: true }}
						/>
						{errors.device_serial_id && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Warranty</div>
						<SelectController
							control={control}
							name="warranty"
							size="md"
							placeholder="Warranty"
							rules={{ required: true }}
							options={WARRANTY}
						/>
						{errors.warranty && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Invoice Amount</div>
						<InputController
							control={control}
							name="invoice_amount"
							size="md"
							type="number"
							placeholder="Invoice Amount or 0"
							prefix={GLOBAL_CONSTANTS.currency_symbol.INR}
							rules={{ required: true }}
						/>
						{errors.invoice_amount && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>GST Amount</div>
						<InputController
							control={control}
							name="tax_amount"
							size="md"
							type="number"
							placeholder="GST Amount or 0"
							prefix={GLOBAL_CONSTANTS.currency_symbol.INR}
							rules={{ required: true }}
						/>
						{errors.tax_amount && (
							<div className={styles.error}>Required</div>
						)}
					</div>
					<div className={styles.controller}>
						<div className={styles.label}>Warranty Amount</div>
						<InputController
							control={control}
							name="warranty_amount"
							size="md"
							type="number"
							placeholder="Warranty Amount or 0"
							prefix={GLOBAL_CONSTANTS.currency_symbol.INR}
							rules={{ required: true }}
						/>
						{errors.warranty_amount && (
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
							options={getVendorNameOptions(device_type)}
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
					<div className={styles.controller}>
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
				<Button type="submit" disabled={loading} size="lg">Submit</Button>
			</form>
		</div>
	);
}

export default EmployeeDashboard;
