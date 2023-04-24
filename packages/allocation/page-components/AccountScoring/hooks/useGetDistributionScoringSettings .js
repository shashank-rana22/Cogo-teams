import { useAllocationRequest } from '@cogoport/request';

function useGetDistributionScoringSettings() {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_distribution_settings',
		method  : 'GET',
		authkey : 'get_allocation_engagement_distribution_settings',
		// params  : {
		// 	limits: [
		// 		{
		// 			warmth      : 'cold',
		// 			lower_limit : 2,
		// 			upper_limit : 4,
		// 		},
		// 		{
		// 			warmth      : 'hot',
		// 			lower_limit : 4,
		// 			upper_limit : 6,
		// 		},
		// 		{
		// 			warmth      : 'very_hot',
		// 			lower_limit : 6,
		// 			upper_limit : 8,
		// 		},
		// 	],
		// },
	}, { manual: false });

	const { list = {} } = data || {};

	return {
		distributionLoading : loading,
		distributionRefetch : refetch,
		distributionList    : list,
	};
}

export default useGetDistributionScoringSettings;
