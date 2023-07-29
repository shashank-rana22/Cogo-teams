import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useUpdateEmployeeDetails from '../../../hooks/useUpdateEmployeeDetailsAdmin';
import AddressDetails from '../AddressDetails';

import controls from './controls';
import styles from './styles.module.css';

const CONTROL_SELECT_TYPE = 'fileUpload';
const DEFAULT_MOBILE_CODE = '+91';

const PERSONAL_INFO = 'personal_info';
const MOBILE_NUMBER = 'mobile_number';
const DATE_OF_BIRTH = 'date_of_birth';
const DATE_OF_JOINING = 'date_of_joining';
const EMERGENCY_CONTACT_DETAILS = 'emergency_contact_details';
const DESIGNATION = 'designation';
const HIRING_MANAGER = 'hiring_manager';
const SOURCE = 'save';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

const PERSONAL_DETAILS_MAPPING = ['name_title', 'name', 'gender', 'date_of_birth',
	'personal_email', 'mobile_number', 'passport_size_photo_url'];

const EMPLOYEE_DETAILS_MAPPING = ['employee_code', 'designation', 'date_of_joining',
	'cogoport_email', 'hiring_manager',
];

const ADDITIONAL_DETAILS_MAPPING = ['relation_type',
	'relation_person_name',
	'emergency_contact_details'];

const SECTION_MAPPING = [
	{
		header : 'Personal Details',
		fields : PERSONAL_DETAILS_MAPPING,
	},
	{
		header : 'Additional Details',
		fields : ADDITIONAL_DETAILS_MAPPING,
	},
	{
		header : 'Employment Details',
		fields : EMPLOYEE_DETAILS_MAPPING,
	},
];

const RenderComponents = ({ controlsvalue, control, errors }) => SECTION_MAPPING.map((section) => (
	<div className={styles.seperator} key={section.header}>
		<div className={styles.form_header}>{section.header}</div>
		<div className={styles.block}>
			{controlsvalue?.map((controlItem) => {
				const { type, label, name: controlName } = controlItem || {};
				if (!type) { return null; }
				const Element = getElementController(type);
				if (!Element) { return null; }
				if (!section.fields.includes(controlName)) {
					return null;
				}

				return (
					<div key={controlName} className={styles.control_container}>
						<div className={styles.label}>
							{label}
						</div>

						<div className={styles.control}>
							<Element
								{...(type === CONTROL_SELECT_TYPE
									? removeTypeField(controlItem) : { ...controlItem })}
								control={control}
								key={controlName}
							/>

							{errors[controlName]?.message
								? (
									<div className={styles.error_msg}>
										{errors[controlName]?.message}
									</div>
								) : null}
						</div>
					</div>
				);
			})}
		</div>
	</div>
));

function PersonalDetails({ data: content, getEmployeeDetails }) {
	const { handleSubmit, control, formState: { errors }, setValue, watch, getValues } = useForm();

	const controlsvalue = controls({ content });

	const id = content?.detail?.id;
	const status = content?.detail?.status;

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails, SOURCE, status });

	const onSubmit = (values) => {
		const {
			permanent_city, permanent_state,
			permanent_country, permanent_pincode, permanent_address, current_address,
			current_city, current_state, current_country, current_pincode, ...rest
		} = values || {};

		const permanent_final_address = {
			city    : permanent_city,
			state   : permanent_state,
			country : permanent_country,
			pincode : permanent_pincode,
			address : permanent_address,
		};
		const current_final_address = {
			city    : current_city,
			state   : current_state,
			country : current_country,
			pincode : current_pincode,
			address : current_address,
		};
		const final_params = {
			...rest,
			permanent_address : permanent_final_address,
			present_address   : current_final_address,
		};
		updateEmployeeDetails({ data: final_params, formType: PERSONAL_INFO });
	};

	useEffect(() => {
		const mapping = {
			mobile_number: {
				number       : content?.detail?.mobile_number,
				country_code : content?.detail?.mobile_country_code || DEFAULT_MOBILE_CODE,
			},
			emergency_contact_details: {
				mobile_number: {
					number: content?.detail?.emergency_contact_details?.
						[GLOBAL_CONSTANTS.zeroth_index]?.mobile_number,
					country_code: content?.detail?.emergency_contact_details?.
						[GLOBAL_CONSTANTS.zeroth_index]?.mobile_country_code || DEFAULT_MOBILE_CODE,
				},
			},
		};

		controlsvalue.forEach((item) => {
			if (item?.name === MOBILE_NUMBER) {
				setValue(
					`${item.name}`,
					mapping[item.name]
					|| content?.detail?.[item.name],
				);
			} else if (
				([DATE_OF_BIRTH, DATE_OF_JOINING].includes(item?.name))
				&& content?.detail?.[item?.name]
			) {
				setValue(item.name, new Date(content?.detail?.[item?.name]));
			} else if (item?.name === EMERGENCY_CONTACT_DETAILS) {
				setValue(
					`${item.name}`,
					mapping[item.name]?.mobile_number
					|| content?.detail?.[item.name].mobile_number,
				);
			} else if (item?.name === DESIGNATION) {
				setValue(item.name, startCase(content?.detail?.[item?.name]));
			} else if (item?.name === HIRING_MANAGER) {
				setValue(item.name, startCase(content?.detail?.[item?.name]?.userName));
			} else {
				setValue(item.name, content?.detail?.[item?.name]);
			}
		});
	}, [content?.detail, controlsvalue, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				<div> Edit Employee details here !</div>
			</div>
			<div className={styles.container}>
				<RenderComponents controlsvalue={controlsvalue} control={control} errors={errors} />
				<AddressDetails
					data={content}
					getEmployeeDetails={getEmployeeDetails}
					control={control}
					errors={errors}
					setValue={setValue}
					watch={watch}
					getValues={getValues}
				/>
			</div>
			<div className={styles.button}>
				<Button
					size="md"
					type="button"
					loading={loading}
					onClick={
					handleSubmit(onSubmit)
					}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default PersonalDetails;
