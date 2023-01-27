import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

interface UseGetVarianceInterface {
	collectionPartyId?:string
}
const useGetVariance = ({ collectionPartyId }:UseGetVarianceInterface) => {
	const [{ data: varianceFullData, loading }, trigger] = useRequest(
		{
			url    : '/get_collection_party_variance',
			method : 'post',
		},
		{ autoCancel: false },
	);

	const getVaraince = async () => {
		try {
			const payload = {
				collection_party_id: collectionPartyId,
			};

			const res = await trigger({ data: payload });
			if (res.hasError) {
				Toast.error('Something went wrong! Please try again after sometime');
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (collectionPartyId) {
			getVaraince();
		}
	}, [collectionPartyId]);

	return { varianceFullData, loading };
};

export default useGetVariance;
