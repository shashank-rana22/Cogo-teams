import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

function useCreateRaiseQuery({
	setShowModal = () => {},
	setIsOpen = () => {},
	shipmentId = '',
	queryType = '',
	remarks = '',
}) {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const {
		control,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm({});

	const [{ loading }, trigger] = useRequest({
		url    : 'raise_query',
		method : 'POST',
		scope  : 'saas',
	}, { manual: true });

	const handleFormSubmit = useCallback(() => {
		(async () => {
			const payload = {
				query_type      : queryType,
				remarks,
				performed_by_id : userId,
				service         : 'shipment',
				service_id      : shipmentId || '3534d9b2-7a8c-47a0-a3d1-93cfb7bf9f69',
			};
			try {
				const res = await trigger({
					data: payload,
				});

				if (!res.hasError) {
					setShowModal(true);
					setIsOpen(false);
					reset();
				}
			} catch (e) {
				Toast.error(getApiErrorString(e?.data));
			}
		})();
	}, [queryType, remarks, userId, shipmentId, trigger, setShowModal, setIsOpen, reset]);

	return {
		loading,
		handleFormSubmit,
		handleSubmit,
		reset,
		errors,
		control,
	};
}

export default useCreateRaiseQuery;
