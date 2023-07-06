import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListShipmentDocuments = ({ params = {} }) => {
	const [{ loading, data: uploadedDocs }, trigger] = useRequest({
		url    : '/list_shipment_documents',
		method : 'GET',
		params : {
			filters: {
				...params,
			},
		},
	}, { manual: true });

	const getDocs = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getDocs();
	}, [getDocs]);

	return {
		uploadedDocs,
		docLoading: loading,
		getDocs,
	};
};

export default useGetListShipmentDocuments;
