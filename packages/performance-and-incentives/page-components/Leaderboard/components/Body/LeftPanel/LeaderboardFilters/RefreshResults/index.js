import { Button, Toast } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RefreshResults({
	loading: getLoading = false,
	refetch = () => {}, refetchStats = () => {}, statsLoading = false,
}) {
	const fetchData = () => {
		try {
			refetch();
			refetchStats();
		} catch {
			Toast.error('Something went wrong!');
		}
	};

	const className = getLoading || statsLoading ? 'animate' : '';

	return (
		<Button
			size="md"
			themeType="secondary"
			disabled={getLoading || statsLoading}
			onClick={fetchData}
			className={styles.refresh}
		>
			<IcMRefresh
				className={styles[className]}
				width={16}
				height={16}
			/>
		</Button>
	);
}

export default RefreshResults;
