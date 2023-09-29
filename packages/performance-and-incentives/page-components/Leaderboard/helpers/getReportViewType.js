import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';

const { ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getReportViewType = ({ currLevel, isChannel }) => {
	const { report_type = '' } = currLevel || {};

	let report_view_type;

	if (report_type === ADMIN_REPORT) {
		report_view_type = isChannel ? 'channel_wise' : 'location_wise';
	}

	return report_view_type;
};

export default getReportViewType;
