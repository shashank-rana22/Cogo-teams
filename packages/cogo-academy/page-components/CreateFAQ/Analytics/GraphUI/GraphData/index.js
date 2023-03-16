import useListFaqSearchHistories from '../../hooks/ListFaqSearchHistories';

function GraphData() {
	const props = useListFaqSearchHistories({});

	const pie_chart = props?.data?.pie_chart_data || 0;
	const {
		total_dislike = 0,
		total_dislike_percentage = 0,
		total_like = 0,
		total_like_percentage = 0,
		total_requested_questions = 0,
		total_requested_questions_percentage = 0,
		total_search_result_available = 0,
		total_search_result_available_percentage = 0,
		total_search_result_not_available = 0,
		total_search_result_not_available_percentage = 0,
		total_searches = 0,
		total_searches_percentage = 0,
		total_viewed_only_questions = 0,
		total_viewed_only_questions_percentage = 0,
	} = pie_chart;
	const pie_data = [
		{
			id    : 'Search Available',
			label : 'Search Available',
			value : total_search_result_available,
		},
		{
			id    : 'Search not Available',
			label : 'Search not Available',
			value : total_search_result_not_available,
		},
	];
	const pie_outer_data = [
		{
			id    : 'Like',
			label : 'Likes',
			value : (total_like / total_search_result_available) * 100,
		},
		{
			id    : 'Dislikes',
			label : 'Dislikes',
			value : (total_dislike / total_search_result_available) * 100,
		},
		{
			id    : 'Viewed Only',
			label : 'Viewed Only',
			value : (total_viewed_only_questions / total_search_result_available) * 100,
		},
		{
			id    : 'Requested',
			label : 'Requested',
			value : total_requested_questions_percentage,
		},

	];
	return { pie_data, pie_outer_data };
}

export default GraphData;
