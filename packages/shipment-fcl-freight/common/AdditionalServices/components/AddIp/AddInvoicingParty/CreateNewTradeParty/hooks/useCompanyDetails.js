// import { Loader } from '@cogoport/components';
// import PATTERNS from '@cogoport/constants/patterns';
import { useForm } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

// import useGetBusiness from '../../hooks/useGetBusiness';
// import { getOrgControls, getAdditionalOrgControls } from '../../utils/controls';

// const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const useCompanyDetails = ({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
// 	const { company_details = {} } = filledDetails;

	// 	const orgControls =		getOrgControls({
	// 		values: company_details,
	// 	}) || [];

	// const additionalOrgControls = getAdditionalOrgControls({ values: company_details }) || [];
	const {
		formState: { errors },
		handleSubmit,
		control,
		register,
		setValue,
	} = useForm();

	const onSubmit = (values = {}) => {
		setFilledDetails({ ...values });
		setCurrentStep('billing_address');
	};

	// const watchCountryId = watch('country_id');
	// const isCountryIndia = watchCountryId === INDIA_COUNTRY_ID;

	// const newFields = {};
	// Object.entries(fields).forEach(([controlName, field]) => {
	// 	let newField = { ...field };
	// 	if (controlName === 'registration_number') {
	// 		newField = {
	// 			...newField,
	// 			onBlur: () => onBlurTaxPanGstinControl(),
	// 			...(businessApiLoading && {
	// 				suffix: (
	// 					<Loader themeType="primary" />
	// 				),
	// 			}),
	// 			...(isCountryIndia && { maxLength: 10 }),
	// 			label : isCountryIndia ? 'PAN' : 'Registration Number',
	// 			rules : {
	// 				...(newField.rules || {}),
	// 				pattern: {},
	// 				...(isCountryIndia && {
	// 					pattern: {
	// 						value   : PATTERNS.PAN_NUMBER,
	// 						message : 'PAN is invalid',
	// 					},
	// 				}),
	// 			},
	// 		};
	// 	}

	// 	if (['business_name', 'company_type'].includes(controlName)) {
	// 		newField = {
	// 			...newField,
	// 			disabled: businessApiLoading,
	// 		};
	// 	}

	// 	newFields[controlName] = newField;
	// });

	// const newErrors = {};
	// Object.entries(errors).forEach(([key, value]) => {
	// 	if (key === 'registration_number') {
	// 		if (!isCountryIndia && value.type === 'pattern') {
	// 			return;
	// 		}
	// 	}

	// 	newErrors[key] = { ...value };
	// });

	return {
		// loading                  : businessApiLoading,
		// errors                   : newErrors,
		onSubmitOfCompanyDetails: onSubmit,
		// orgControls,
		control,
		// additionalOrgControls,
		handleSubmit,
		register,
		setValue,
	};
};

export default useCompanyDetails;
