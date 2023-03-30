import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
import { getControls } from '../utils/getControls';
import isRegistrationNumberValid from '../utils/isRegistrationNumberValid';

import useOnBlurTaxPanGstinControl from './useOnBlurTaxPanGstinControl';

const COUNTRY_IDS = {
	IN : GLOBAL_CONSTANTS.country_ids.IN,
	VN : GLOBAL_CONSTANTS.country_ids.VN,
};

function useOnBoardVendor({
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id, partner_id = '' } = query;

	const router = useRouter();

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
		clearErrors,
		watch,
		trigger,
	} = useForm();

	const watchForm = watch();

	const { country_id, registration_number = {} } = watchForm;

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		initialCall: false, params: { filters: { type: ['city'], country_id } },
	}));

	const fields = getControls({
		countryOptions,
		cityOptions,
	});

	const {
		onBlurTaxPanGstinControl,
	} = useOnBlurTaxPanGstinControl({
		watchCountryId   : watchForm.country_id,
		INDIA_COUNTRY_ID : COUNTRY_IDS.IN,
		setValue,
	});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'registration_number' && value.country_id === COUNTRY_IDS.IN) {
				const registrationDetails = value[name];

				if (isEmpty(registrationDetails)) {
					clearErrors('registration_number');
				} else {
					const { registrationType = '', registrationNumber = '' } = registrationDetails;

					const is_valid = isRegistrationNumberValid({
						registrationNumber: registrationNumber.toUpperCase(),
						registrationType,
					});

					if (is_valid) {
						clearErrors('registration_number');
					} else {
						trigger('registration_number');
					}
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [clearErrors, trigger, watch, watchForm]);

	const newFields = [];

	fields.forEach((field) => {
		let newField = field;

		if (field.name === 'registration_number') {
			newField = {
				...newField,
				countryId : watchForm.country_id,
				onBlur    : null,
				maxLength : null,
				rules     : {
					required : true,
					validate : (value) => {
						const { registrationType = '', registrationNumber = '' } = value || {};

						if (!registrationNumber) {
							return 'Registration Number is required';
						}

						if (Object.values(COUNTRY_IDS).includes(watchForm.country_id)) {
							if (!registrationType) {
								return 'Registration Type is required';
							}

							if (
								registrationType
									&& registrationNumber
									&& !isRegistrationNumberValid({
										registrationType,
										registrationNumber,
									})
							) {
								return `${registrationType?.toUpperCase()} is Invalid`;
							}
						}

						return undefined;
					},
				},
			};

			if (watchForm.country_id === COUNTRY_IDS.IN) {
				const {
					registrationType: watchRegistartionType = '',
					registrationNumber: watchRegistrationNumber = '',
				} = watchForm.registration_number || {};

				newField = {
					...newField,
					onBlur: () => onBlurTaxPanGstinControl({
						registrationNumber : (watchRegistrationNumber || '').toUpperCase(),
						registrationType   : watchRegistartionType || '',
					}),
					maxLength: watchRegistartionType === 'gstin' ? 15 : 10,
				};
			}

			if (watchForm.country_id === COUNTRY_IDS.VN) {
				newField = {
					...newField,
					maxLength: 14,
				};
			}
		}

		if (field.name === 'registration_proof_url') {
			const { registrationType = '' } = registration_number;

			if (registrationType) {
				newField = {
					...newField,
					label: `Upload ${registrationType.toUpperCase()} Certificate`,
				};
			}
		}

		newFields.push(newField);
	});

	const { vendor_details } = vendorInformation;

	const isUpdateAction = !isEmpty(vendor_details);

	const [{ loading }, triggerApi] = useRequest({
		url    : isUpdateAction ? '/update_vendor' : '/create_vendor',
		method : 'post',
	}, { manual: true });

	const createVendor = async ({ data, step }) => {
		const formattedValues = getValues();

		const {
			registration_number: registrationNo,
			registration_proof_url,
		} = formattedValues || {};

		const payload = {
			...formattedValues,
			registration_proof_url : registration_proof_url?.finalUrl,
			registration_number    : registrationNo?.registrationNumber,
			registration_type      : registrationNo?.registrationType,
			cogo_entity_id         : partner_id,
		};

		try {
			const res = await triggerApi({ data: { id: vendor_id, ...payload } });

			if (!isUpdateAction) {
				const href = '/onboard-vendor/[vendor_id]';
				const as = `/onboard-vendor/${res.data.id}`;

				router.push(href, as);
			}
			setVendorInformation((pv) => {
				const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);

				return {
					...pv,
					[key]: {
						...data,
						registration_proof_url: registration_proof_url?.finalUrl,
					},
				};
			});

			Toast.success(`Vendor ${isUpdateAction ? 'updated' : 'created'} successfully`);

			setActiveStepper('contact_details');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		const {
			vendor_details: vendorDetails = {},
		} = vendorInformation;

		fields.forEach((field) => {
			if (field.name === 'registration_number') {
				setValue(`${field.name}`, {
					registrationNumber:
					vendorDetails?.registration_number?.registrationNumber
					|| vendorDetails?.registration_number,
					registrationType: vendorDetails?.registration_number?.registrationType
					|| vendorDetails?.registration_type,
				});
			} else if (field.name === 'registration_proof_url') {
				setValue(`${field.name}`, vendorDetails?.[field.name]
				|| vendorDetails?.[field.name]?.finalUrl);
			} else {
				setValue(`${field.name}`, vendorDetails?.[field.name]);
			}
		});
	}, [fields, setValue, vendorInformation]);

	return {
		fields: newFields,
		control,
		errors,
		handleSubmit,
		createVendor,
		loading,
	};
}

export default useOnBoardVendor;
