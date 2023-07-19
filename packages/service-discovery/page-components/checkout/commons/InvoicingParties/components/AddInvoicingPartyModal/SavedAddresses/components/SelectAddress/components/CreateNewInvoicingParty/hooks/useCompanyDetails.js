import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { upperCase } from '@cogoport/utils';

import Spinner from '../../../../../../../../../Spinner';
import useGetBusiness from '../../AddressForm/hooks/useGetBusiness';
import { getOrgControls, getAdditionalOrgControls } from '../utils/controls';

const useCompanyDetails = ({
	savedDetails = {},
	setSavedDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { company_details = {} } = savedDetails;

	const orgControls =	getOrgControls({
		values: company_details,
	}) || [];

	const additionalOrgControls = getAdditionalOrgControls({ values: company_details }) || [];

	const companyDetailsControls = [...orgControls, ...additionalOrgControls];

	const companyDetailsFormProps = useForm();

	const {
		watch,
		setValue,
		formState: { errors = {} },
	} = companyDetailsFormProps;

	const fields = companyDetailsControls.reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {});

	const watchPan = watch('registration_number');
	const watchCountryId = watch('country_id');
	const watchBusinessName = watch('business_name');

	const countrySpecificData = getCountrySpecificData({
		country_id    : watchCountryId,
		accessorType  : 'navigations',
		accessor      : 'partner',
		isDefaultData : false,
	});

	const { common } = countrySpecificData || {};

	const { validate_registration_number = false } = common || {};

	const { getBusinessApi = {}, onBlurTaxPanGstinControl = () => {} } = useGetBusiness({
		watchTaxNumber         : upperCase(watchPan),
		watchBusinessName,
		setValue,
		registrationNumberType : validate_registration_number
			? 'registration'
			: '',
	});

	const onSubmit = (values = {}) => {
		setSavedDetails((previousState) => ({
			...(previousState || {}),
			company_details: {
				...values,
				verification_document:
					values?.verification_document?.finalUrl
					|| values?.verification_document,
			},
		}));

		setCurrentStep('billing_address');
	};

	const businessApiLoading = getBusinessApi.loading;

	const NEW_FIELDS = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'registration_number') {
			newField = {
				...newField,
				onBlur: () => onBlurTaxPanGstinControl(),
				...(businessApiLoading && {
					suffix: (
						<Spinner
							size={20}
							style={{ padding: '4px', margin: '16px' }}
							spinBorderColor="#1444a1"
							outerBorderColor="#e7efff"
						/>
					),
				}),
				...(validate_registration_number && { maxLength: 10 }),
				label : validate_registration_number ? 'PAN' : 'Registration Number',
				rules : {
					...(newField.rules || {}),
					pattern: {},
					...(validate_registration_number && {
						pattern: {
							value   : GLOBAL_CONSTANTS.regex_patterns.pan_number,
							message : 'PAN is invalid',
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

		NEW_FIELDS[controlName] = newField;
	});

	const NEW_ERRORS = {};
	Object.entries(errors).forEach(([key, value]) => {
		if (key === 'registration_number') {
			if (!validate_registration_number && value.type === 'pattern') {
				return;
			}
		}

		NEW_ERRORS[key] = { ...value };
	});

	return {
		loading                  : businessApiLoading,
		errors                   : NEW_ERRORS,
		onSubmitOfCompanyDetails : onSubmit,
		orgControls,
		additionalOrgControls,
		companyDetailsFormProps  : { ...companyDetailsFormProps, fields: NEW_FIELDS },
	};
};

export default useCompanyDetails;
