import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateAirwayBillDocument = ({ details, setUpdateAirwayBill, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'POST',
	}, { manual: true });
	const updateApi = async (values) => {
		const payload = {
			id                  : details?.id || undefined,
			document_type       : 'airway_bill',
			performed_by_org_id : details?.uploaded_by_org_id || undefined,
			documents           : [
				{
					document_url : values?.airway_bill?.finalUrl || undefined,
					file_name    : values?.airway_bill?.fileName || undefined,
					data         : {
						description      : values?.description || undefined,
						document_number  : values?.doc_number || undefined,
						containers_count : '',
						bl_detail_id     : details?.bl_detail_id || undefined,
					},
				},
			],
		};
		try {
			await trigger({ data: payload });
			setUpdateAirwayBill({ updateModal: false });
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		updateApi,
		loading,
	};
};
export default useUpdateAirwayBillDocument;
