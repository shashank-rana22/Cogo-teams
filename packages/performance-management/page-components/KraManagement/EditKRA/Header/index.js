import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ data }) {
	const userName = useSelector(({ profile }) => profile?.user?.name);

	return (
		<div className={styles.container}>
			<div className={styles.title1}>
				Hello,
				{' '}
				{startCase(userName)}
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
