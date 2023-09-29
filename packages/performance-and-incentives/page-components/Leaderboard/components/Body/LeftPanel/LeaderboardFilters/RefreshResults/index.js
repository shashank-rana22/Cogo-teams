import { Button, Toast } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RefreshResults(props) {
	const { listLoading, listRefetch, refetchStats, statsLoading } = props;

	console.log('listRefetch :: ', listRefetch);

	const fetchData = () => {
		try {
			listRefetch();
			refetchStats();
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
			className={styles.refresh}
		>
			<IcMRefresh
				width={16}
				height={16}
			/>
		</Button>
	);
}

export default RefreshResults;
