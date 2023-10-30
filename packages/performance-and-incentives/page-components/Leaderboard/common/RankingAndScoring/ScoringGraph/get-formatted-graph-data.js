import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getFormattedGraphData = (scoringGraphData) => {
	const { data_points } = scoringGraphData || {};

	return [{
		id   : 'rank',
		data : (data_points || []).map(([timestamp, score]) => ({
			x: formatDate({
				date       : new Date(timestamp),
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
				formatType : 'date',
			}),
			y: score,
		})),
	}];
};
export default getFormattedGraphData;
