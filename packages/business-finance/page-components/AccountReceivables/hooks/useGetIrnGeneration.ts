import { Toast } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface IrnGenerationProps {
	id?: string,
	refetch?: Function
	entityCode: string

}

const useGetIrnGeneration = ({ id, refetch, entityCode }: IrnGenerationProps) => {
	const { profile = {} } = useSelector((state) => state || {});

	const { irn_label:irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;

	const { user = {} } = profile;

	const { id: userId = '' } = user;

	const [
		{ data, loading },
		generateIrnTrigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/irn-generate`,
			method  : 'post',
			authKey : 'post_sales_invoice_by_id_irn_generate',
		},
		{ manual: true },
	);

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

	const generateIrn = async () => {
		try {
			const resp = await generateIrnTrigger({ data: {} });
			if (resp.status === 200) {
				Toast.success(`${irnLabel} Generated Successfully`);
			} else {
				Toast.error(`${irnLabel} Generated Failed`);
			}
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	const finalPostFromSage = async () => {
		try {
			const resp = await finalPostTrigger({
				data: {
					invoiceIds  : [id],
					performedBy : userId,
				},
			});
			refetch();
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
		generateIrn,
		data,
		loading,
		finalPostFromSage,
		finalPostData,
		finalPostLoading,
		getSageInvoiceData,
		sageInvoiceData,
		sageInvoiceLoading,
	};
};

export default useGetIrnGeneration;
