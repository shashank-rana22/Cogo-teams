/* eslint-disable import/order */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
// eslint-disable-next-line import/no-relative-packages
import GLOBAL_CONSTANTS from '../../../../../../common/constants/globals.json';
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

	const { vendor_id } = query;

	const router = useRouter();

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['city'] } },
	}));

	const fields = getControls({
		countryOptions,
		cityOptions,
	});

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchForm]);

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
							return 'Tax Number is required';
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
								return `${registrationType.toUpperCase()} is Invalid`;
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

		const payload = {
			...formattedValues,
			registration_proof_url: formattedValues?.registration_proof_url?.finalUrl,
		};

		try {
			const res = await triggerApi({ data: { id: vendor_id, ...payload } });

			setVendorInformation((pv) => {
				const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);

				return {
					...pv,
					[key]: { ...data, document_url: formattedValues?.document_url?.finalUrl },
				};
			});

			if (!isUpdateAction) {
				const href = '/onboard-vendor/[vendor_id]';
				const as = `/onboard-vendor/${res.data.id}`;
				router.push(href, as);
			}

			Toast.success(`Vendor ${isUpdateAction ? 'updated' : 'created'} successfully`);

			setActiveStepper('contact_details');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		fields.forEach((field) => {
			setValue(`${field.name}`, vendorInformation?.vendor_details?.[field.name]);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorInformation]);

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
