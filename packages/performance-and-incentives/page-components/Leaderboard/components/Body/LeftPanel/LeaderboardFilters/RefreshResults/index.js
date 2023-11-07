import { Button, Toast } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../../constants/leaderboard-viewtype-constants';

const { MANAGER, AGENT } = LEADERBOARD_VIEWTYPE_CONSTANTS;

function RefreshResults(props) {
	const { listLoading, listRefetch, refetchStats, statsLoading, getUserProgress } = props;

	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const fetchData = () => {
		try {
			listRefetch();
			refetchStats();

			if ([MANAGER, AGENT].includes(incentive_leaderboard_viewtype)) {
				getUserProgress();
			}
		} catch {
			Toast.error('Something went wrong!');
		}
	};

	return (
		<Button
			size="md"
			themeType="secondary"
			disabled={listLoading || statsLoading}
			onClick={fetchData}
			style={{ marginRight: '8px' }}
		>
			<IcMRefresh
				width={16}
				height={16}
			/>
		</Button>
	);
}

export default RefreshResults;
