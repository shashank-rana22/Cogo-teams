import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import getElementController from '../../../configs/getElementController';
import BulkUpload from '../BulkUpload';

import controls from './controls';
import styles from './styles.module.css';

const DEFAULT_HOUR_MINUTE_SECOND = 0;

const PERSONAL_DETAILS_MAPPING = ['name', 'personal_email', 'mobile_number'];

const EMPLOYEE_DETAILS_MAPPING = [
	'employee_code',
	'designation',
	'date_of_joining',
	'office_location',
	'cogoport_email',
	'office_location_country',
	'attendance',
	'learning_indicator',
	'predictive_index',
	'department',
];

const HR_DETAILS_MAPPING = ['hr_id', 'reporting_manager_id', 'hiring_manager_id', 'hrbp_id'];

const CONTROL_HRBP_ID = 'hrbp_id';

const SECTION_MAPPING = [
	{
		header         : 'Personal Details',
		containerStyle : styles.personal_details_container,
		fields         : PERSONAL_DETAILS_MAPPING,
	},
	{
		header         : 'Employment Details',
		containerStyle : styles.employement_details_container,
		fields         : EMPLOYEE_DETAILS_MAPPING,
	},
	{
		header         : 'HR Details',
		containerStyle : styles.hr_details_container,
		fields         : HR_DETAILS_MAPPING,
	},
];

const RenderFields = ({ show, control, errors }) => (Object.keys(controls) || []).map((controlItem) => {
	const { name = '', label = '', type = '' } = controls[controlItem] || {};
	if (!show.includes(name)) {
		return null;
	}
	const DynamicController = getElementController(type);

	return (
		<div key={name} className={styles.single_field}>
			<div className={styles.label}>{label}</div>

			<div className={styles.controller_wrapper}>
				<DynamicController
					{...controls[controlItem]}
					control={control}
					name={name}
				/>
			</div>

			{errors[name] ? (
				<div className={styles.error_message}>
					{' '}
					{errors[name]?.message}
				</div>
			) : null}
		</div>
	);
});

function FormComponent({ setActivePage = () => {} }) {
	const router = useRouter();

	const { user = {} } = useSelector((state) => state.profile);

	const [bulkUploadComponent, setBulkUploadComponent] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'post',
			url    : '/create_employee_detail',
		},
		{ manual: true },
	);

	const onClickBackIcon = () => {
		router.back();
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		setValue(CONTROL_HRBP_ID, user.id);
	}, [setValue, user.id]);

	const onClickSaveDetails = async (values) => {
		const { attendance, learning_indicator, predictive_index, ...rest } = values || {};
		const additional_information_attributes = [
			{
				attendance,
				predictive_index,
				learning_indicator,
			},
		];
		try {
			const doj = values?.date_of_joining;

			const utcDate = new Date(
				Date.UTC(
					doj?.getFullYear(),
					doj?.getMonth(),
					doj?.getDate(),
					DEFAULT_HOUR_MINUTE_SECOND,
					DEFAULT_HOUR_MINUTE_SECOND,
					DEFAULT_HOUR_MINUTE_SECOND,
				),
			) || undefined;

			const payload = {
				...rest,
				mobile_number       : values?.mobile_number?.number,
				mobile_country_code : values?.mobile_number?.country_code,
				date_of_joining     : utcDate,
				additional_information_attributes,
			};

			const res = await trigger({ data: payload });

			setActivePage(res?.data?.id);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	if (bulkUploadComponent) {
		return <BulkUpload setBulkUploadComponent={setBulkUploadComponent} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.back_arrow}>
					<IcMArrowBack
						width={20}
						height={20}
						style={{ cursor: 'pointer' }}
						onClick={onClickBackIcon}
					/>

					<div className={styles.header}>NEW HIRE&apos;S DETAILS</div>
				</div>

				<Button
					type="button"
					themeType="secondary"
					style={{ marginRight: 20 }}
					onClick={() => setBulkUploadComponent(true)}
				>
					Bulk Upload
				</Button>
			</div>

			<div className={styles.form}>
				{SECTION_MAPPING.map((section) => (
					<div className={styles.seperator} key={section}>
						<div className={styles.form_header}>{section.header}</div>
						<div className={section.containerStyle}>
							<RenderFields
								show={section?.fields}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
				))}

				<div className={styles.button_container}>
					<Button
						themeType="primary"
						onClick={handleSubmit(onClickSaveDetails)}
						loading={loading}
					>
						Save Details
					</Button>
				</div>
			</div>
		</div>
	);
}

export default FormComponent;
