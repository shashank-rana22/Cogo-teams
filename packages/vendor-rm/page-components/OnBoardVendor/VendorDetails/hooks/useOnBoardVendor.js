import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
// import TABS_MAPPING from '../../../../constants/tabs';
import { getControls } from '../utils/getControls';

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
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor',
		method : 'post',
	}, { manual: true });

	const [{ loading: updateLoading }, updateTrigger] = useRequest({
		url    : '/update_vendor',
		method : 'post',
	}, { manual: true });

	const createVendor = async ({ data, step }) => {
		const formattedValues = getValues();

		setVendorInformation((pv) => {
			const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);

			return {
				...pv,
				[key]: { ...data, document_url: formattedValues?.document_url?.finalUrl },
			};
		});

		const payload = {
			...formattedValues,
			registration_proof_url: formattedValues?.registration_proof_url?.finalUrl,
		};

		try {
			let res = {};

			if (vendor_id) {
				res = await updateTrigger({ data: { id: vendor_id, ...payload } });

				Toast.success('Vendor updated successfully');
			} else {
				res = await trigger({ data: { ...payload } });

				const href = '/onboard-vendor/[vendor_id]';
				const as = `/onboard-vendor/${res.data.id}`;
				router.push(href, as);

				Toast.success('Vendor created successfully');
			}

			setActiveStepper('contact_details');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		fields.forEach((field) => {
			setValue(`${field.name}`, vendorInformation?.vendor_details?.[field.name]);
		});
		setValue('document_url', vendorInformation?.vendor_details?.document_url);
	}, [fields, setValue, vendorInformation]);

	return {
		fields,
		control,
		errors,
		handleSubmit,
		createVendor,
		loading,
	};
}

export default useOnBoardVendor;
