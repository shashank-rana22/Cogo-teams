import { useAllocationRequest } from '@cogoport/request';
import { useRef } from 'react';

function useGetKamExpertiseCurrentConfig({ type }) {
	const draftRef = useRef({});

	const scrollDraftRef = () => {
		draftRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const [{ data = {}, loading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
		params  : {
			filters: { status: type || undefined },
		},
	}, { manual: false });

	const { list = [] } = data;

	return {
		list,
		configCardLoading : loading,
		cardRefetch       : refetch,
		draftRef,
		scrollDraftRef,
	};
}
export default useGetKamExpertiseCurrentConfig;
