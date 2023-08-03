import useListFaqSearchHistories from './ListFaqSearchHistories';

function useGraphData() {
	const props = useListFaqSearchHistories();

	const { data, dateRange, setDateRange, formatStartDate, formatEndDate } = props || {};

	const { pie_chart_data:pie_chart = {}, graph_data } = data || {};

	const {
		total_requested_questions_percentage = 0,
		available_search_count_percentage = 0,
		not_available_search_count_percentage = 0,
		total_dislike = 0,
		total_likes = 0,
		total_view_count = 0,
		total_requested_questions = 0,
		not_available_search_count = 0,
		available_search_count = 0,
		total_searches = 0,
	} = pie_chart;
	const LIKES_PERCENTAGE = (total_likes / total_view_count) * 100;
	const DISLIKES_PERCENTAGE = (total_dislike / total_view_count) * 100;
	const VIEW_COUNT = total_view_count - (total_dislike + total_likes);
	const VIEW_COUNT_PERCENTAGE = (VIEW_COUNT / total_view_count) * 100;
	const pie_data = [
		{
			id    : 'Search Available',
			label : `Search Available(${Math.round(available_search_count)}) 
			${available_search_count_percentage}%`,
			value : Math.round(available_search_count_percentage * 100) / 100,
			color : 'hsla(80, 52%, 84%, 1)',
		},
		{
			id    : 'Search not Available',
			label : `Search not Available(${not_available_search_count}) 
			${not_available_search_count_percentage}%`,
			value : not_available_search_count_percentage,
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
			label : `Not Requested(${not_available_search_count - total_requested_questions})
			 ${100 - total_requested_questions_percentage}%`,
			value : 100 - total_requested_questions_percentage,
			color : 'hsl(38, 100%, 91%)',
		},
	];

	const view_count_data =	[
		{
			id    : 'like',
			label : `Likes(${total_likes}) ${Math.round(LIKES_PERCENTAGE * 100) / 100}%`,
			value : Math.round(LIKES_PERCENTAGE * 100) / 100,
			color : 'hsla(39, 55%, 94%, 1)',
		},
		{
			id    : 'dislike',
			label : `Dislike(${total_dislike}) ${Math.round(DISLIKES_PERCENTAGE * 100) / 100}%`,
			value : Math.round(DISLIKES_PERCENTAGE * 100) / 100,
			color : 'hsla(41, 64%, 86%, 1)',
		},
		{
			id    : 'view_only',
			label : `View Only(${VIEW_COUNT}) ${Math.round(VIEW_COUNT_PERCENTAGE * 100) / 100}%`,
			value : Math.round(VIEW_COUNT_PERCENTAGE * 100) / 100,
			color : 'hsla(80, 52%, 84%, 1)',
		},
	];

	return {
		pie_data,
		pie_outer_data,
		graph_data,
		dateRange,
		setDateRange,
		view_count_data,
		total_searches,
		formatStartDate,
		formatEndDate,
	};
}

export default useGraphData;
