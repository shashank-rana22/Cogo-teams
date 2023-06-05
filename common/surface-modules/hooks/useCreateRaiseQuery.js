import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../utils/toastApiError';

function useCreateRaiseQuery({
	setShowModal = () => {},
	setIsOpen = () => {},
	shipmentId = '',
}) {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const [{ loading }, trigger, data] = useRequest({
		url    : 'raise_query',
		method : 'POST',
	}, { manual: true });

	const handleFormSubmit = async (values) => {
		const payload = {
			query_type      : values?.query_type,
			remarks         : values?.remarks,
			performed_by_id : userId,
			service         : 'shipment',
			service_id      : shipmentId,
		};

		try {
			const res = await trigger({
				data: payload,
			});
			if (!res.hasError) {
				setShowModal(true);
				setIsOpen(false);
			}
		} catch (e) {
			toastApiError(e?.data);
		}
	};

	return {
		loading,
		data: data || [],
		handleFormSubmit,
	};
}

export default useCreateRaiseQuery;
