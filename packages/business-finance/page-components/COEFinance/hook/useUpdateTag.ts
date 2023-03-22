import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

const useUpdateTag = ({
	onClose = () => {},
	billId = '',
	tagValue = '',
	remark = '',
}) => {
	const [loading, setLoading] = useState(false);

	const [{ data }, trigger] = useRequestBf(
		{
			url     : `/purchase/bills/${billId}/urgency-tag`,
			method  : 'put',
			authKey : 'put_purchase_bills_by_id',
		},
		{ autoCancel: false },
	);

	const handleSubmit = async () => {
		if (tagValue === 'urgent' && !remark.length) {
			Toast.error('Please add why its urgent!!');
		} else {
			setLoading(true);
			try {
				await trigger({
					data: {
						urgencyTag     : tagValue,
						urgencyRemarks : remark || undefined,
					},
				});
				onClose();
			} catch (err) {
				setLoading(false);
				Toast.error(err?.response?.data?.message);
			}
			setLoading(false);
		}
	};

	return {
		loading,
		handleSubmit,
		data,
	};
};

export default useUpdateTag;
