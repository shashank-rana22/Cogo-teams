import useListFaqSearchHistories from './ListFaqSearchHistories';

function useGraphData() {
	const props = useListFaqSearchHistories({});

	const { data, dateRange, setDateRange } = props || {};

	const { pie_chart_data:pie_chart = 0, graph_data } = data || {};

	console.log('data', data);

	const {
		total_dislike_percentage = 0,
		total_like_percentage = 0,
		total_requested_questions_percentage = 0,
		total_search_result_available_percentage = 0,
		total_search_result_not_available_percentage = 0,
		total_viewed_only_questions_percentage = 0,
		total_dislike = 0,
		total_likes = 0,
		total_view_count = 0,
	} = pie_chart;
	const LIKE = (total_search_result_available_percentage / 100) * total_like_percentage;
	const DISLIKE = (total_search_result_available_percentage / 100) * total_dislike_percentage;
	const VIEWED = (total_search_result_available_percentage / 100) * total_viewed_only_questions_percentage;
	const REQUESTED = (total_search_result_not_available_percentage / 100) * total_requested_questions_percentage;
	const VIEW_COUNT = total_view_count - (total_dislike + total_likes);
	const pie_data = [
		{
			id    : 'Search Available',
			label : 'Search Available',
			value : total_search_result_available_percentage,
			color : 'hsla(80, 52%, 84%, 1)',
		},
		{
			id    : 'Search not Available',
			label : 'Search not Available',
			value : total_search_result_not_available_percentage,
			color : 'hsla(232, 44%, 96%, 1)',
		},
	];

	const pie_outer_data = [
		{
			id    : 'Like',
			label : 'Likes',
			value : Math.round(LIKE * 100) / 100,
			color : 'hsla(39, 55%, 94%, 1)',
		},
		{
			id    : 'Dislikes',
			label : 'Dislikes',
			value : Math.round(DISLIKE * 100) / 100,
			color : 'hsla(41, 64%, 86%, 1)',
		},
		{
			id    : 'Viewed Only',
			label : 'Viewed Only',
			value : Math.round(VIEWED * 100) / 100,
			color : 'hsl(202, 0%, 50%)',
		},
		{
			id    : 'Not Requested',
			label : 'Not Requested',
			value : Math.round((total_search_result_not_available_percentage - REQUESTED) * 100) / 100,
			color : 'hsl(255, 100%, 100%)',
		},
		{
			id    : 'Requested',
			label : 'Requested',
			value : Math.round((total_search_result_not_available_percentage / 100)
					* total_requested_questions_percentage * 100) / 100,
			color: 'hsla(234, 46%, 87%, 1)',
		},
	];

	const view_count_data =	[
		{
			id    : 'like',
			label : 'Like',
			value : total_dislike,
			color : 'hsla(39, 55%, 94%, 1)',
		},
		{
			id    : 'dislike',
			label : 'Dislike',
			value : total_likes,
			color : 'hsla(41, 64%, 86%, 1)',
		},
		{
			id    : 'view_only',
			label : 'View Only',
			value : VIEW_COUNT,
			color : 'hsla(234, 46%, 87%, 1)',
		},
	];

	return { pie_data, pie_outer_data, graph_data, dateRange, setDateRange, view_count_data };
}

export default useGraphData;
