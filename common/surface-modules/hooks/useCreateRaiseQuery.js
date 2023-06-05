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
			query_type: values?.query_type,
			remarks: values?.remarks,
			performed_by_id: userId,
			service: 'shipment',
			service_id: shipmentId,
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
			toastApiError(e?.data);
		}
	};

	return {
		loading,
		data: data || [],
		// controls,
		handleFormSubmit,
	};
}

export default useCreateRaiseQuery;



// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { useCallback } from 'react';

// import toastApiError from '../utils/toastApiError';

// function useCreateRaiseQuery({
// 	handleRaisedQuery = () => {},
// 	shipmentId = '',
// 	queryType = '',
// 	remarks = '',
// }) {
// 	const { userId } = useSelector(({ profile }) => ({
// 		userId: profile.id,
// 	}));

// 	const [{ loading }, trigger] = useRequest({
// 		url    : 'raise_query',
// 		method : 'POST',
// 	}, { manual: true });

// 	const handleFormSubmit = useCallback(() => {
// 		(async () => {
// 			const payload = {
// 				query_type      : queryType,
// 				remarks,
// 				performed_by_id : userId,
// 				service         : 'shipment',
// 				service_id      : shipmentId,
// 			};
// 			try {
// 				const res = await trigger({
// 					data: payload,
// 				});

// 				if (!res.hasError) {
// 					handleRaisedQuery();
// 				}
// 			} catch (e) {
// 				toastApiError(e);
// 			}
// 		})();
// 	}, [queryType, remarks, userId, shipmentId, trigger, handleRaisedQuery]);

// 	return {
// 		loading,
// 		handleFormSubmit,
// 	};
// }

// export default useCreateRaiseQuery;
