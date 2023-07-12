import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import getUserControls from '../../../configurations/get-controls';

function useCreateResponse(props) {
	const {
		type,
		refetch,
		activeTab,
		setShowAddPoc,
	} = props;

	const router = useRouter();

	const partnerId = useSelector((state) => (state.profile?.partner?.id));

	const { query = {} } = router;

	const formProps = useForm();

	const { control, handleSubmit, formState: { errors }, watch, setValue, resetField } = formProps;

	const watchForm = watch();

	const { country:country_id = '', city:city_id = '' } = watchForm;

	const taxLabel = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'label',
		isDefaultData : false,
	}) || 'GST';

	const taxPattern = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'pattern',
		isDefaultData : false,
	});

	const controls = getUserControls({
		activeTab, country_id, city_id, taxLabel, taxPattern,
	});

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const onSave = async (values = {}) => {
		try {
			const payload = {

				...values,
				...(activeTab === 'user' && {
					mobile_country_code           : values?.mobile_number?.country_code,
					mobile_number                 : values?.mobile_number?.number,
					alternate_mobile_country_code : values?.alternate_mobile_number?.country_code,
					alternate_mobile_number       : values?.alternate_mobile_number?.number,
					whatsapp_country_code         : values?.whatsapp_number?.country_code,
					whatsapp_number               : values?.whatsapp_number?.number,
				}),
				response_type : activeTab,
				source        : GLOBAL_CONSTANTS.country_entity_ids.VN === partnerId
					? 'manual_enriched' : 'manual',
				feedback_request_id: query?.id,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Response Submitted Successfully');

			if (type === 'addPoc') {
				setShowAddPoc(false);
			}

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const resetMultipleFields = useCallback((fields = []) => {
		fields?.map((field) => resetField(field));
	}, [resetField]);

	useEffect(() => {
		resetMultipleFields(['state', 'pincode', 'city']);
	}, [country_id, setValue, resetMultipleFields]);

	return {
		controls,
		control,
		errors,
		onSave,
		handleSubmit,
		loading,
	};
}

export default useCreateResponse;
