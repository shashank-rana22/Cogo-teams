import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreditNoteNullify = ({
	invoiceId = '',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_revoked_invoice',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (data) => {
		const { remarks, file } = data;
		try {
			const res = await trigger({
				data: {
					invoice_combination_id : invoiceId,
					remarks                : [remarks],
					document_urls          : [file?.finalUrl ? file?.finalUrl : undefined],
				},
			});

			if (!res.hasError) {
				Toast.success('Credit Note Nullified Successfully');
				refetch();
			}
		} catch (err) {
			toastApiError(err?.data);
		}
	};
	return {
		loading,
		onCreate,
	};
};

export default useCreditNoteNullify;
