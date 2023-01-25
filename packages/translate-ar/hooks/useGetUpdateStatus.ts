import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, getByKey } from '@cogoport/utils';

interface Props {
	url?: string;
	setOpen?:(v:boolean)=>void;
	itemData?: {
		id?: string,
		[key: string]: string
	};
	refetch: Function;
}

const useUpdateStatus = ({ url, setOpen, itemData = {}, refetch }: Props) => {
	const profile = useSelector((state) => state);
	const { partner } = profile || {};
	const { id: partnerId } = partner || {};

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/upload-translated-invoice',
			method  : 'post',
			authKey : 'post_sales_upload_translated_invoice',
		},
		{ autoCancel: false, manual: true },
	);

	const { id } = itemData;
	let docType = '';
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		docType = 'INVOICE';
	} else {
		docType = 'PROFORMA';
	}

	const uploadDoc = async () => {
		try {
			await trigger({
				data: {
					url,
					createdBy    : partnerId,
					invoiceId    : id,
					documentType : docType,
				},
			});
			Toast.success('Uploaded successful');
			refetch();
			setOpen(false);
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		uploadDoc,
		loading,
	};
};

export default useUpdateStatus;
