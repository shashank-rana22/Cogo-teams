import { Button, Toast } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

function RefreshResults(props) {
	const { listLoading, listRefetch, refetchStats, statsLoading, getUserProgress } = props;

	const fetchData = () => {
		try {
			listRefetch();
			refetchStats();
			getUserProgress();
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
