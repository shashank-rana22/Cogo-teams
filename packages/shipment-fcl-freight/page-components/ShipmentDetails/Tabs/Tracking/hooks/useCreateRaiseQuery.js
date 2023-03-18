import { useEffect, useCallback } from "react";
import { useSelector } from "@cogoport/store";
import { useRequest } from "@cogoport/request";
import { Toast } from "@cogoport/components";
import getApiErrorString from "@cogoport/forms/utils/getApiError";

function useCreateRaiseQuery({
	setShowModal = () => {},
	setIsOpen = () => {},
	shipmentId = '',
	queryType = '',
	remarks = '',
}) {
	const { scope, userId } = useSelector(({ general, profile }) => ({
		scope: general?.scope,
		userId: profile.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url: 'raise_query',
		method: "POST",
		scope,
	  },{ manual: true });

	const handleFormSubmit = useCallback(() => {
		(async () => {
		const payload = {
			query_type: queryType,
			remarks: remarks,
			performed_by_id: userId,
			service: 'shipment',
			service_id: shipmentId || '3534d9b2-7a8c-47a0-a3d1-93cfb7bf9f69',
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
			Toast.error(getApiErrorString(e?.data));
		}
    })();
	}, [trigger, queryType, remarks]);

	return {
		loading,
		handleFormSubmit,
	};
}

export default useCreateRaiseQuery;
