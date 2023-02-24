import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useGenerateDocument = ({
	shipmentId = {},
}) => {
	const [{ loading:documentLoading }, { trigger:listDocumentsTrigger }] = 	useRequest(
		'/list_shipment_documents',
		{ manual: true },
	);

	const generateCertificate = async () => {
		const params = {
			shipment_id: shipmentId,
		};
		try {
			await listDocumentsTrigger({
				params,
			});
		} catch (err) {
			Toast.error(err?.error?.message || err?.data?.error);
		}
	};

	return {
		documentLoading,
		generateCertificate,
	};
};
export default useGenerateDocument;
