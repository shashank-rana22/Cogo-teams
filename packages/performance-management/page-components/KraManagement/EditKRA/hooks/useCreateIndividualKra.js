import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_TARGET_VALUE = 0;

function useCreateIndividualKra({ data: createKraData }) {
	const [valuesIndividualKRA, setValuesIndividualKRA] = useState([]);
	const [ratingInfo, setRatingInfo] = useState(DEFAULT_TARGET_VALUE);

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
					individual_kras: objData,
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
	}, [trigger]);

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
