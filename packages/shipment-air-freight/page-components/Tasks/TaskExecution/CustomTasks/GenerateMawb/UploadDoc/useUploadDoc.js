import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUploadDocument = ({
	task = {},
	shipment_data = {},
	refetch = () => {},
	clearTask,
}) => {
	const [{ loading }, createShipmentDocumentTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const uploadDocument = async (values) => {
		const document_number = shipment_data?.booking_reference_number;
		const payload = {
			id   : task?.id,
			data : {
				documents: [
					{
						file_name     : values?.url?.fileName || undefined,
						document_url  : values?.url?.finalUrl || undefined,
						document_type : 'draft_airway_bill',
						data          : {
							status      : 'uploaded',
							url         : values?.url?.finalUrl || undefined,
							description : values?.description,
							document_number,
						},
					},
				],
			},
		};

		try {
			if (document_number) {
				const res = await createShipmentDocumentTrigger({
					data: payload,
				});
				if (!res.hasError) {
					Toast.success('Task Completed Successfully');
					clearTask();
					refetch();
				}
			}
		} catch (err) {
			toastApiError(err);
		}
	};
	return { uploadDocument, loading };
};

export default useUploadDocument;
