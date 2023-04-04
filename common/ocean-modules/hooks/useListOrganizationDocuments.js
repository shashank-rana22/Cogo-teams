import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext, useCallback } from 'react';

const useListOrganizationDocuments = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '', id = '' } = shipment_data;

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_documents',
		method : 'GET',
	}, { manual: true });

	const getList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						page    : 1000,
						filters : {
							status          : ['accepted'],
							organization_id : importer_exporter_id,
							shipment_id     : id || undefined,
						},
					},
				});
			} catch (err) {
				Toast.error(err);
			}
		})();
	}, [trigger, importer_exporter_id, id]);

	return {
		data,
		loading,
		getList,
	};
};

export default useListOrganizationDocuments;
