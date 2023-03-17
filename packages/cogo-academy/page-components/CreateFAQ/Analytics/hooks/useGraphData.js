import useListFaqSearchHistories from './ListFaqSearchHistories';

function GraphData() {
	const props = useListFaqSearchHistories({});

	const { data } = props || {};

	const { pie_chart_data:pie_chart = 0, graph_data } = data || {};

	const {
		total_dislike_percentage = 0,
		total_like_percentage = 0,
		total_requested_questions_percentage = 0,
		total_search_result_available_percentage = 0,
		total_search_result_not_available_percentage = 0,
		total_viewed_only_questions_percentage = 0,
	} = pie_chart;
	const Like = (total_search_result_available_percentage / 100) * total_like_percentage;
	const Dislike = (total_search_result_available_percentage / 100) * total_dislike_percentage;
	const Viewed = (total_search_result_available_percentage / 100) * total_viewed_only_questions_percentage;
	const Available_Remaining = total_search_result_available_percentage - (Like + Dislike + Viewed);
	const Requested = (total_search_result_not_available_percentage / 100) * total_requested_questions_percentage;
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
			value : Math.round(Like * 100) / 100,
			color : 'hsla(39, 55%, 94%, 1)',
		},
		{
			id    : 'Dislikes',
			label : 'Dislikes',
			value : Math.round(Dislike * 100) / 100,
			color : 'hsla(41, 64%, 86%, 1)',
		},
		{
			id    : 'Viewed Only',
			label : 'Viewed Only',
			value : Math.round(Viewed * 100) / 100,
			color : 'hsl(202, 0%, 50%)',
		},
		{
			id    : 'No Action',
			label : 'No Action',
			value : Math.round(Available_Remaining * 100) / 100,
			color : 'hsl(255, 100%, 100%)',
		},
		{
			id    : 'Not Requested',
			label : 'Not Requested',
			value : Math.round((total_search_result_not_available_percentage - Requested) * 100) / 100,
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

	return { pie_data, pie_outer_data, graph_data };
}

export default GraphData;
