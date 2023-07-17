import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import getControls from '../utils/controls';
import getMutatedControls from '../utils/get-mutated-address-controls';

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

	const mutatedControls = getMutatedControls({ controls, setAddressData });

	const onSubmit = async () => {
		const values = getValues();

		const { tax_number = '' } = values || {};

		try {
			const payload = {
				...values,
				response_type       : isEmpty(tax_number) ? 'address' : 'billing_address',
				source              : 'manual',
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
