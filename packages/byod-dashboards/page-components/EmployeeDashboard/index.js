import { Button } from '@cogoport/components';
import {
	useForm, InputController, SelectController, DatepickerController, UploadController,
} from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import EmployeeData from '../../common/EmployeeData';
import Spinner from '../../common/Spinner';
import useCreateInvoice from '../../hooks/useCreateDeviceDetail';
import useGetEmployees from '../../hooks/useGetEmployees';
import { VENDOR_NAME_OPTIONS } from '../../utils/constant';

import styles from './styles.module.css';

function EmployeeDashboard() {
	const { user = {} } = useSelector((state) => state.profile);

	const [refetchReimbursementList, setRefetchReimbursementList] = useState(true);

	const { id: user_id } = user;

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		reset,
	} = useForm();

	const { data : employeeData, loading : employeeDataLoading } = useGetEmployees(user_id);
	const { createDeviceDetail, loading } = useCreateInvoice({ setRefetchReimbursementList, reset });

	const formValues = watch();

	const handleForm = (values) => {
		createDeviceDetail(values);
	};

	const { vendor_name, device_type } = formValues;

	useEffect(() => {
		setValue('vendor_name', '');
		setValue('other_vendor_name', '');
	}, [device_type, setValue]);

	const { reimbursement_group_details = {} } = employeeData || {};
	const { device_details = [] } = reimbursement_group_details || {};

	const DEVICE_OPTIONS = (device_details || []).map((device_detail) => ({
		label : startCase(device_detail?.device_type),
		value : device_detail?.device_type,
	}));

	if (employeeDataLoading) return <div className={styles.spinner_container}><Spinner /></div>;

	return (
		<div className={styles.main_container}>
			<div className={styles.title}>BYOD Form</div>

			<EmployeeData
				data={employeeData}
				refetchReimbursementList={refetchReimbursementList}
				setRefetchReimbursementList={setRefetchReimbursementList}
			/>

			<form onSubmit={handleSubmit(handleForm)}>
				<div className={styles.form}>
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
								prefix="shvam"
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
				</div>

				<div className={styles.form}>
					<div className={styles.heading}>Amount :</div>

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

					<div className={styles.button_container}>
						<Button type="submit" disabled={loading} size="md">SUBMIT</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EmployeeDashboard;
