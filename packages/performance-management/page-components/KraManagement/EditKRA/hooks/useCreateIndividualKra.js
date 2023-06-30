import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_TARGET_VALUE = 0;

function useCreateIndividualKra({ data: createKraData }) {
	const { user = {} } = useSelector((state) => state?.profile);

	const [valuesIndividualKRA, setValuesIndividualKRA] = useState();

	const [ratingInfo, setRatingInfo] = useState();

	const { id: user_id } = user;

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_individual_kra',
		method : 'POST',
	}, { manual: true });

	useEffect(() => {
		setValuesIndividualKRA(createKraData);
		setRatingInfo();
	}, [createKraData]);

	const getPayload = (values) => values?.map((item) => ({
		employee_id                    : item?.employee_id,
		kra_id                         : item?.kra_id,
		target_value                   : item?.target_value || DEFAULT_TARGET_VALUE,
		is_value_entered_in_percentage : item?.selected_value_type === 'percentage',
	}));

	const createIndividualKra = useCallback(async (values) => {
		const objData = getPayload(values);

		try {
			await trigger({
				data: {
					individual_kras   : objData,
					performed_by_id   : user_id,
					performed_by_type : 'user',
				},
			});

			Toast('Targets submitted successfully');
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [trigger, user_id]);

	return {
		data,
		loading,
		createIndividualKra,
		valuesIndividualKRA,
		setValuesIndividualKRA,
		ratingInfo,
		setRatingInfo,
	};
}

export default useCreateIndividualKra;
