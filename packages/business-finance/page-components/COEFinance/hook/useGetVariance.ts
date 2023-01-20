import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';
import { useSelector } from "@cogoport/store";
import { Toast } from '@cogoport/components';

interface  useGetVarianceInterface {
    collectionPartyId?:string
}
const useGetVariance = ({ collectionPartyId }:useGetVarianceInterface) => {
	const scope = useSelector(({ general }:any) => general.scope);

    const [{data: varianceFullData,loading}, trigger] = useRequest(
        {
            url: '/get_collection_party_variance',
            method: "post",
        },
        { autoCancel: false }
    );

	const getVaraince = async () => {
		try {
			const payload = {
				collection_party_id: '17d34106-8f62-475f-8a75-fab213193ad4',
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
