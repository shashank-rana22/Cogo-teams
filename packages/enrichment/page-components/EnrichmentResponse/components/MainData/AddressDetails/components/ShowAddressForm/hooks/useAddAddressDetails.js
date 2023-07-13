import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getControls from '../utils/controls';

const regionControls = ['country', 'state'];

const geo = getGeoConstants();

const useAddAddressDetails = ({
	setShowForm = () => {},
	refetchResponses = () => {},
}) => {
	const router = useRouter();

	const [addressData, setAddressData] = useState({});

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
		resetField,
	} = useForm();

	const { country_id, region_id } = addressData;

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const controls = getControls({
		country_id, region_id,
	});

	const mutatedControls = controls.map((mutatedControl) => {
		let newControl = { ...mutatedControl };

		if (regionControls.includes(newControl.name)) {
			newControl = {
				...newControl,
				onChange: (val, obj) => {
					setAddressData((prev) => ({
						...prev,
						[newControl.name === 'country' ? 'country_id' : 'region_id']: obj?.id,
					}));
				},
			};
		}

		return newControl;
	});

	const onSubmit = async () => {
		const values = getValues();

		try {
			const payload = {
				...values,
				response_type       : 'address',
				source              : geo.navigations.enrichment.enrichment_response_source,
				feedback_request_id : query?.id,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Address Added Successfully');

			setShowForm(false);

			refetchResponses();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to add new address, please try again...');
		}
	};

	const resetMultipleFields = useCallback((fields = []) => {
		fields?.map((field) => resetField(field));
	}, [resetField]);

	useEffect(() => {
		resetMultipleFields(['state', 'pincode', 'city']);
	}, [country_id, setValue, resetMultipleFields]);

	return {
		loading,
		controls: mutatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,

	};
};

export default useAddAddressDetails;
