import { useState } from 'react';
import { useRequest,useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';

const useUpdateTag = ({
	onClose = () => {},
	billId = '',
	tagValue = '',
	collectionPartyId = '',
	remarks = '',
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

	const [{}, CollectionPartyTrigger ] = useRequest(
		{
			url     : 'shipment/update_shipment_collection_party',
			method  : 'post',
			// authKey : 'update_shipment_collection_party',
		},
		{ autoCancel: false },
	);

	const handleSubmit = async () => {
		if (tagValue === 'urgent' && !remarks.length) {
			Toast.error('Please add why its urgent!!');
		} else {
			setLoading(true);
			try {
				const response = await trigger({
					data: {
						urgencyTag: tagValue,
						urgencyRemarks: remarks || undefined,
					},
				});
		 
				if (!response?.hasError) {
						const finalRes = await CollectionPartyTrigger({
							data: {
								id: collectionPartyId,
								urgency_tag: tagValue || null,
								remarks: remarks.length ? [remarks] : undefined,
							},
						});
				   
					if (!finalRes?.error) {
						Toast.success('Tag successfully Updated');
						setLoading(false);
						onClose();
					} else {
						Toast.error('Something went wrong!');
						setLoading(false);
					}
				}
			} catch (err) {
				setLoading(false);
				Toast.error(err.message);
			}
			setLoading(false);
		}
	};

	return {
		loading,
		handleSubmit,
	};
};

export default useUpdateTag;
