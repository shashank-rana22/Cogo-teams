import { useDebounceQuery } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useScoringReports = (props) => {
	const { dateRange, entity } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = viewType.split('_');

	const [isChannel, setIsChannel] = useState(false);

	let report_view_type;

	if (view === 'admin') {
		report_view_type = isChannel ? 'channel_wise' : 'location_wise';
	} else {
		report_view_type = `${view}_wise`;
	}

	const [params, setParams] = useState({
		user_data_required      : true,
		role_data_required      : true,
		add_current_user_report : view !== 'admin',
		filters                 : {
			report_view_type,
			...(view !== 'admin' ? { report_type: `${view}_report` } : {}),
			q                       : searchQuery || undefined,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
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
				...(view === 'admin' ? { report_view_type: isChannel ? 'channel_wise' : 'location_wise' } : {}),

			},
		}));
	}, [isChannel, view]);

	return {
		params,
		setParams,
		debounceQuery,
		isChannel,
		setIsChannel,
	};
};

export default useScoringReports;
