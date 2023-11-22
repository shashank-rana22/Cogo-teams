import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

function useCreateEntityMargin({
	entities = [],
	service = '',
	setShowModal = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_entity_margin',
	}, {
		manual: true,
	});

	const createEntityMargin = async (values) => {
		try {
			const payload = {
				from_entity_id : entities[GLOBAL_CONSTANTS.zeroth_index]?.id,
				to_entity_id   : entities[1]?.id,
				margin_slabs   : values?.margin_slabs.map((val) => ({
					...val,
					currency: val?.limit_currency,
				})),
				service_type: service,
			};

			await trigger({ data: payload });

			Toast.success('Margin added successfully');

			setShowModal((pv) => ({
				...pv,
				action: 'view',
			}));
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createEntityMargin,
		loading,
	};
}

export default useCreateEntityMargin;
