import useListFaqSearchHistories from './ListFaqSearchHistories';

function useGraphData() {
	const props = useListFaqSearchHistories();

	const { data, dateRange, setDateRange } = props || {};

	const { pie_chart_data:pie_chart = 0, graph_data } = data || {};

	const {

		total_requested_questions_percentage = 0,
		total_search_result_available_percentage = 0,
		total_search_result_not_available_percentage = 0,
		total_dislike = 0,
		total_likes = 0,
		total_view_count = 0,
		total_requested_questions = 0,
		total_search_result_not_available = 0,
		total_search_result_available = 0,

	} = pie_chart;
	console.log(pie_chart);
	const LIKES_PERCENTAGE = (total_likes / total_view_count) * 100;
	const DISLIKES_PERCENTAGE = (total_dislike / total_view_count) * 100;
	const VIEW_COUNT = total_view_count - (total_dislike + total_likes);
	const VIEW_COUNT_PERCENTAGE = (VIEW_COUNT / total_view_count) * 100;
	const pie_data = [
		{
			id    : 'Search Available',
			label : `Search Available(${total_search_result_available}) 
			${total_search_result_available_percentage}%`,
			value : total_search_result_available_percentage,
			color : 'hsla(80, 52%, 84%, 1)',
		},
		{
			id    : 'Search not Available',
			label : `Search not Available(${total_search_result_not_available}) 
			${total_search_result_not_available_percentage}%`,
			value : total_search_result_not_available_percentage,
			color : 'hsla(232, 44%, 96%, 1)',
		},
	];

	const pie_outer_data = [
		{
			id    : 'Requested',
			label : `Requested(${total_requested_questions}) ${total_requested_questions_percentage}%`,
			value : total_requested_questions_percentage,
			color : 'hsla(234, 46%, 87%, 1)',
		},

		{
			id    : 'Not Requested',
			label : `Not Requested(${total_search_result_not_available - total_requested_questions})
			 ${100 - total_requested_questions_percentage}%`,
			value : 100 - total_requested_questions_percentage,
			color : 'hsl(255, 100%, 100%)',
		},

	];

	const view_count_data =	[
		{
			id    : 'like',
			label : `Likes(${total_likes}) ${LIKES_PERCENTAGE}%`,
			value : LIKES_PERCENTAGE,
			color : 'hsla(39, 55%, 94%, 1)',
		},
		{
			id    : 'dislike',
			label : `Dislike(${total_dislike}) ${DISLIKES_PERCENTAGE}%`,
			value : DISLIKES_PERCENTAGE,
			color : 'hsla(41, 64%, 86%, 1)',
		},
		{
			id    : 'view_only',
			label : `View Only(${VIEW_COUNT}) ${VIEW_COUNT_PERCENTAGE}%`,
			value : VIEW_COUNT_PERCENTAGE,
			color : 'hsla(80, 52%, 84%, 1)',
		},
	];

	return { pie_data, pie_outer_data, graph_data, dateRange, setDateRange, view_count_data };
}

export default useGraphData;
