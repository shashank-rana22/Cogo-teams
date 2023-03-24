import { cl, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function RaiseQuery({ setShowModal = () => {} }) {
	return (
		<div className={styles.container}>
			<IcCFtick style={{ height: '60px', width: '60px' }} />
			<div className={styles.text}>Your query has been sent successfully!</div>
			<div className={cl`${styles.text} ${styles.msg}`}>
				Thanks for your feedback. We are working on the resolution of your
				query.
			</div>
			<Button
				onClick={() => setShowModal(false)}
				themeType="accent"
				style={{ marginRight: 10, border: 'none' }}
			>
				Okay
			</Button>
		</div>
	);
}

export default RaiseQuery;
