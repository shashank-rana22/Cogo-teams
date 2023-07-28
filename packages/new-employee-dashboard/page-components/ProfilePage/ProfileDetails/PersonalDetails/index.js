import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useUpdateEmployeeDetails from '../../../hooks/useUpdateEmployeeDetailsAdmin';

import controls from './controls';
import styles from './styles.module.css';

const EMERGENCY_CONTACT_NUMBER_INDEX = 0;

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
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const controlsvalue = controls({ content });

	const id = content?.detail?.id;
	const status = content?.detail?.status;

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails, SOURCE, status });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: PERSONAL_INFO });
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
						[EMERGENCY_CONTACT_NUMBER_INDEX]?.mobile_number,
					country_code: content?.detail?.emergency_contact_details?.
						[EMERGENCY_CONTACT_NUMBER_INDEX]?.mobile_country_code || DEFAULT_MOBILE_CODE,
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content?.detail, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				<div>Please update your details here !</div>
			</div>
			<div className={styles.container}>
				<RenderComponents controlsvalue={controlsvalue} control={control} errors={errors} />
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
