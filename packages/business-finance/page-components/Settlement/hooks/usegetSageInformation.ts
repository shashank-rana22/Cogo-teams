import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface IrnGenerationProps {
	id?: string,
}

const usegetSageInformation = ({ id }: IrnGenerationProps) => {
	const { profile = {} } = useSelector((state) => state || {});

	const { user = {} } = profile;

	const { id: userId = '' } = user;

	const [
		{ data: finalPostData, loading: finalPostLoading },
		finalPostTrigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/post-from-sage',
			method  : 'post',
			authKey : 'post_sales_invoice_post_from_sage',
		},
		{ manual: true },
	);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/post-to-sage',
			method  : 'post',
			authKey : 'post_sales_invoice_post_to_sage',
		},
		{ manual: true },
	);

	const postToSage = async () => {
		try {
			await trigger({ data: { id } });
			Toast.success('Post to sage successful');
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	const [
		{ data: sageInvoiceData, loading: sageInvoiceLoading },
		sageDataTrigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/final-post-sage-info`,
			method  : 'get',
			authKey : 'get_sales_invoice_by_id_final_post_sage_info',
		},
		{ manual: true },
	);

	const finalPostFromSage = async () => {
		try {
			const resp = await finalPostTrigger({
				data: {
					invoiceIds  : [id],
					performedBy : userId,
				},
			});
			if (resp?.data?.failedIdsList?.length > 0) {
				Toast.error(' could not final posted, please check!');
			} else {
				Toast.success('Invoice is final Posted from Sage Successfully');
			}
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	const getSageInvoiceData = async () => {
		try {
			sageDataTrigger();
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	return {
		finalPostFromSage,
		finalPostData,
		finalPostLoading,
		getSageInvoiceData,
		sageInvoiceData,
		sageInvoiceLoading,
		postToSage,
	};
};

export default usegetSageInformation;
