import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
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
			filters: { status: !isEmpty(type) ? type : undefined },
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
