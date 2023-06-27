import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ data }) {
	const router = useRouter();

	const handleCreateKRA = () => {
		router.push('/performance-management/kra-management/create-kra');
	};

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.title1}>Hello, Bhaskar Priyadarshi</div>
				<Button onClick={handleCreateKRA}>Create KRA</Button>
			</div>

			<div className={styles.target_remains_ctn}>
				Manual Targets Remaining :
				{' '}
				{data?.remaining_unasssigned_targets}
			</div>

		</div>
	);
}

export default Header;
