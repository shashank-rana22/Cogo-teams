import { Button } from '@cogoport/components';
import {
	useForm, InputController, SelectController,
	RadioGroupController, DatepickerController, UploadController,
} from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import React, { useEffect } from 'react';

import DeviceDetails from '../../common/DeviceDetails';
import Spinner from '../../common/Spinner';
import useCreateInvoice from '../../hooks/useCreateDeviceDetail';
import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import {
	EXISTING_DEVICE_OPTIONS,
	SURRENDER_OPTIONS, WARRANTY, getDeviceTypeOptions, getVendorNameOptions,
} from '../../utils/constant';

import styles from './styles.module.css';

function EmployeeDashboard() {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id } = user;

	const { data, loading : dataLoading, refetch } = useGetEmployeeDetails(user_id, true);
	const { createDeviceDetail, loading } = useCreateInvoice(refetch);

	const { employee_device_detail } = data || {};

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			current_device_status: 'retain',
		},
	});

	const formValues = watch();

	const handleForm = (values) => {
		createDeviceDetail(values);
	};

	const { current_device_status, vendor_name, device_type } = formValues;

	useEffect(() => {
		if (current_device_status === 'retain') {
			setValue('device_type', 'existing');
			setValue('surrendering_reason', '');
		}
		if (current_device_status === 'surrender') {
			setValue('device_type', '');
			setValue('surrendering_reason', '');
		}
	}, [current_device_status, setValue]);

	useEffect(() => {
		setValue('vendor_name', '');
		setValue('other_vendor_name', '');
	}, [device_type, setValue]);

	if (dataLoading) {
		return (
			<div className={styles.spinner_container}>
				<Spinner />
			</div>
		);
	}

	if (data) {
		return (
			<>
				<div className={styles.title}>Employee Dashboard</div>
				<DeviceDetails deviceData={employee_device_detail} />
			</>
		);
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.title}>Employee Dashboard</div>
			<form onSubmit={handleSubmit(handleForm)}>
				<div className={styles.heading}>Current Device</div>
				<div className={styles.controller}>
					<div className={styles.label}>What do you want to do with your Existing Device</div>
					<RadioGroupController
						options={EXISTING_DEVICE_OPTIONS}
						control={control}
						name="current_device_status"
						rules={{ required: true }}
					/>
					{errors.current_device_status && (
						<div className={styles.error}>Required</div>
					)}
				</div>
				{formValues.current_device_status === 'surrender' && (
					<div className={styles.surrender_controller}>
						<div className={styles.label}>If surrending your laptop, then?</div>
						<SelectController
							control={control}
							name="surrendering_reason"
							size="md"
							placeholder="Select..."
							rules={{ required: true }}
							options={SURRENDER_OPTIONS}
						/>
						{errors.surrendering_reason && (
							<div className={styles.error}>Required</div>
						)}
					</div>
				)}

				<div className={styles.heading}>Apply for Device</div>
				<div className={styles.container}>
					<div className={styles.controller}>
						<div className={styles.label}>Device type</div>
						<SelectController
							control={control}
							name="device_type"
							size="md"
							disabled={current_device_status === 'retain'}
							placeholder="Device type"
							rules={{ required: true }}
							options={getDeviceTypeOptions(current_device_status)}
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
							placeholder="Invoice Amount"
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
							placeholder="GST Amount"
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
							placeholder="GST Amount"
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
					{vendor_name === 'others' && (
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
				<Button type="submit" disabled={loading}>Submit</Button>
			</form>
		</div>
	);
}

export default EmployeeDashboard;
