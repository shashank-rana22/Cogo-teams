// import { useState } from 'react';
// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import {  Toast } from '@cogoport/components';

// const usePurchaseBillStatus = ({ collectionPartyId ='' }) => {
// 	const [loading, setLoading] = useState(false);

// 	const { user_profile } = useSelector(({ profile }:any) => ({
// 		user_profile: profile,
// 	}));

// 	const { trigger } = useRequest('put', false, 'business_finance', {
// 		authkey: 'put_purchase_bills_status',
// 	})(`/purchase/bills/status`);

// 	const updateCollectionPartyApi = useRequest(
// 		'post',
// 		false,
// 		'partner',
// 	)('/update_shipment_collection_party');

// 	const handleSubmit = async ({ payload = {} }) => {
// 		setLoading(true);
// 		try {
// 			const response = await trigger({
// 				data: {
// 					...payload,
// 					updatedBy: user_profile?.id,
// 					performedByUserType: '',
// 				},
// 			});

// 			const coe_status =
// 				payload.status === 'FINANCE_ACCEPTED' ? 'coe_approved' : 'coe_rejected';

// 			await updateCollectionPartyApi.trigger({
// 				data: {
// 					status: coe_status,
// 					id: collectionPartyId,
// 					remarks:
// 						coe_status === 'coe_rejected' ? [payload.remarks] : undefined,
// 				},
// 			});

// 			if (!response?.hasError) {
// 				Toast.success('Updated successfully');
// 				onClose();
// 				setLoading(false);
// 			} else {
// 				Toast.error('Something went wrong');
// 				setLoading(false);
// 			}
// 		} catch (err) {
// 			setLoading(false);
// 		}
// 		setLoading(false);
// 	};

// 	return {
// 		loading,
// 		handleSubmit,
// 	};
// };

// export default usePurchaseBillStatus;
