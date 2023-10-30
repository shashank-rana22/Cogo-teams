import LEADERBOARD_REPORT_TYPE_CONSTANTS from './leaderboard-reporttype-constants';

const { OWNER_REPORT, MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const TAG_COLOR_MAPPING = {
	[OWNER_REPORT]   : '#ddebc0',
	[MANAGER_REPORT] : '#cfeaed',
	[AGENT_REPORT]   : '#ced1ed',
};

export default TAG_COLOR_MAPPING;
