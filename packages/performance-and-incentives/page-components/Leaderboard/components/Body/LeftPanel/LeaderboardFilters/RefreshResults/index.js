import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function RefreshResults({ loading: getLoading = false, refetch = () => {} }) {
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			await refetch();
		} finally {
			setLoading(false);
		}
	};

	const className = loading ? 'animate' : '';

	return (
		<Button
			size="md"
			themeType="secondary"
			disabled={!loading && getLoading}
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
