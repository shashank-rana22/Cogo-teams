import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_TARGET_VALUE = 0;

function useCreateIndividualKra({ data: createKraData, fetchIndividualKRA }) {
	const [individualKRAValues, setIndividualKRAValues] = useState([]);
	const [ratingInfo, setRatingInfo] = useState(DEFAULT_TARGET_VALUE);

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_individual_kra',
		method : 'POST',
	}, { manual: true });

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
			fetchIndividualKRA();
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [fetchIndividualKRA, trigger]);

	useEffect(() => {
		setIndividualKRAValues(createKraData);
		setRatingInfo();
	}, [createKraData]);

	const handleTargetChange = (val, item, name) => {
		const newData = individualKRAValues?.map((element) => {
			if (`${element.employee_id}_${element?.kra_id}` === `${item.employee_id}_${item?.kra_id}`) {
				if (name === 'target_value') {
					return {
						...element,
						[name]: val,
					};
				}
				return {
					...element,
					[name]: val === 'yes' ? 'percentage' : 'flat',
				};
			}
			return element;
		});

		if (newData?.length) {
			setIndividualKRAValues(newData);
		}
	};

	return {
		data,
		loading,
		createIndividualKra,
		individualKRAValues,
		setIndividualKRAValues,
		ratingInfo,
		setRatingInfo,
		handleTargetChange,
	};
}

export default useCreateIndividualKra;
