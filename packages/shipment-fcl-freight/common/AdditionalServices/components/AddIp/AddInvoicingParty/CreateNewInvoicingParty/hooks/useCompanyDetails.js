// import { patterns } from '@cogoport/constants';
// import { useFormCogo } from '@cogoport/front/hooks';
import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

import useGetBusiness from '../../hooks/useGetBusiness';
import { getOrgControls, getAdditionalOrgControls } from '../../utils/controls';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const useCompanyDetails = ({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { company_details = {} } = filledDetails;

	const orgControls =		getOrgControls({
		values: company_details,
	}) || [];

	const additionalOrgControls =		getAdditionalOrgControls({ values: company_details }) || [];

	const companyDetailsControls = [...orgControls, ...additionalOrgControls];

	// const companyDetailsFormProps = useFormCogo(companyDetailsControls);

	const {
		watch,
		setValues,
		formState: { errors = {} },
		fields,
	} = companyDetailsFormProps;

	const watchPan = watch('registration_number');
	const watchCountryId = watch('country_id');
	const watchBusinessName = watch('business_name');

	const isCountryIndia = watchCountryId === INDIA_COUNTRY_ID;

	const { getBusinessApi = {}, onBlurTaxPanGstinControl = () => {} } =		useGetBusiness({
		watchTaxNumber         : watchPan.toUpperCase(),
		watchBusinessName,
		setValues,
		registrationNumberType : isCountryIndia ? 'registration' : '',
	});

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...(previousState || {}),
			company_details: values,
		}));
		setCurrentStep('billing_address');
	};

	const businessApiLoading = getBusinessApi.loading;

	const newFields = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'registration_number') {
			newField = {
				...newField,
				onBlur: () => onBlurTaxPanGstinControl(),
				...(businessApiLoading && {
					suffix: (
						<Loader themeType="primary" />
					),
				}),
				...(isCountryIndia && { maxLength: 10 }),
				label : isCountryIndia ? 'PAN' : 'Registration Number',
				rules : {
					...(newField.rules || {}),
					pattern: {},
					...(isCountryIndia && {
						pattern: {
							// value   : patterns.PAN_NUMBER,
							message: 'PAN is invalid',
						},
					}),
				},
			};
		}

		if (['business_name', 'company_type'].includes(controlName)) {
			newField = {
				...newField,
				disabled: businessApiLoading,
			};
		}

		newFields[controlName] = newField;
	});

	const newErrors = {};
	Object.entries(errors).forEach(([key, value]) => {
		if (key === 'registration_number') {
			if (!isCountryIndia && value.type === 'pattern') {
				return;
			}
		}

		newErrors[key] = { ...value };
	});

	return {
		loading                  : businessApiLoading,
		errors                   : newErrors,
		onSubmitOfCompanyDetails : onSubmit,
		orgControls,
		additionalOrgControls,
		companyDetailsFormProps  : { ...companyDetailsFormProps, fields: newFields },
	};
};

export default useCompanyDetails;
