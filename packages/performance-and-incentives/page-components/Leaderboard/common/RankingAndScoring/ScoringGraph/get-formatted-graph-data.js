import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getFormattedGraphData = (scoringGraphData) => {
	const { data_points, abscissa } = scoringGraphData || {};

	return [{
		id   : 'rank',
		data : (data_points || []).map(([timestamp, score]) => ({
			x: abscissa === 'hour' ? formatDate({
				date       : timestamp,
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			}) : formatDate({
				date       : timestamp,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
				formatType : 'date',
			}),
			y: score,
		})),
	}];
};
export default getFormattedGraphData;
