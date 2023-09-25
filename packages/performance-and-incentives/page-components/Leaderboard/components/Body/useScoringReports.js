import { useDebounceQuery } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const getReportViewType = ({ incentive_leaderboard_viewtype, isChannel }) => {
	const [view] = incentive_leaderboard_viewtype.split('_');

	let report_view_type;

	if (incentive_leaderboard_viewtype === ADMIN) {
		report_view_type = isChannel ? 'channel_wise' : 'location_wise';
	} else {
		report_view_type = `${view}_wise`;
	}

	return report_view_type;
};

const useScoringReports = (props) => {
	const { dateRange, entity } = props;

	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = incentive_leaderboard_viewtype.split('_');

	const [isChannel, setIsChannel] = useState(false);

	const [params, setParams] = useState({
		user_data_required      : true,
		role_data_required      : true,
		add_current_user_report : incentive_leaderboard_viewtype !== ADMIN,
		filters                 : {
			report_view_type        : getReportViewType({ incentive_leaderboard_viewtype, isChannel }),
			report_type             : incentive_leaderboard_viewtype !== ADMIN ? `${view}_report` : undefined,
			q                       : searchQuery || undefined,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			current_user_id         : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
			user_id                 : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
		},
	});

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q                       : searchQuery || undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
			},
		}));
	}, [searchQuery, dateRange, entity, setParams]);

	useEffect(() => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				...(incentive_leaderboard_viewtype === ADMIN
					? { report_view_type: isChannel ? 'channel_wise' : 'location_wise' } : {}),

			},
		}));
	}, [isChannel, incentive_leaderboard_viewtype]);

	return {
		params,
		setParams,
		debounceQuery,
		isChannel,
		setIsChannel,
	};
};

export default useScoringReports;
