import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
	}, { manual: true });

	const handleFormSubmit = useCallback(() => {
		(async () => {
			const payload = {
				query_type      : queryType,
				remarks,
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
					reset();
				}
			} catch (e) {
				Toast.error(getApiErrorString(e));
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
