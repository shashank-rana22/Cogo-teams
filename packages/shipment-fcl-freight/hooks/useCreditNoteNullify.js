import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useCreditNoteNullify = ({
	invoiceId = '',
	refetch = () => {},
	successMessage = 'Credit Note Nullified Successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_revoked_invoice',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (data) => {
		const { remarks, file } = data || {};
		try {
			await trigger({
				data: {
					invoice_combination_id : invoiceId,
					remarks                : [remarks],
					document_urls          : [file?.finalUrl ? file?.finalUrl : undefined],
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.data));
		}
	};
	return {
		loading,
		onCreate,
	};
};

export default useCreditNoteNullify;
