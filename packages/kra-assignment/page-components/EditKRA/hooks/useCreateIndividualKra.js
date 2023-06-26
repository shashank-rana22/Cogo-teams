import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const DEFAULT_TARGET_VALUE = 0;

function useCreateIndividualKra() {
	const { user = {} } = useSelector((state) => state?.profile);

	const { id: user_id } = user;

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_individual_kra',
		method : 'POST',
	}, { manual: true });

	const createIndividualKra = useCallback(async (valuesIndividualKRA) => {
		const objData = valuesIndividualKRA?.map((item) => (
			{
				employee_id                    : item?.employee_id,
				kra_id                         : item?.kra_id,
				target_value                   : item?.target_value || DEFAULT_TARGET_VALUE,
				is_value_entered_in_percentage : item?.selected_value_type === 'percentage',
			}
		));

		try {
			await trigger({
				data: {
					individual_kras   : objData,
					performed_by_id   : user_id,
					performed_by_type : 'user',
				},
			});
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
	};
}

export default useCreateIndividualKra;
