import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useTranslatePorforma = ({
	bfInvoice,
	formvalues,
	refetch = () => {},
	onClose = () => {},
}) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const rejectInvoice = useRequest('put', false, 'business_finance', {
		authkey: 'put_sales_invoice_translate_proforma',
	})('sales/invoice/translate-proforma');

	const onSubmit = async () => {
		try {
			const response = await rejectInvoice.trigger({
				data: {
					proformaId        : bfInvoice?.id,
					translationRemark : formvalues?.reject_remarks || '',
					performedBy       : user_profile?.id,
				},
			});

			if (!response?.hasError) {
				toast.success('Proforma Rejected!');
				refetch();
				onClose();
			}
		} catch (err) {
			toast.error(err);
		}
	};

	return {
		onSubmit,
		rejectInvoiceLoading: rejectInvoice.loading,
	};
};

export default useTranslatePorforma;
