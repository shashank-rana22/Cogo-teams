import React from 'react';
import Button from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { cl } from '@cogoport/components';
import styles from './styles.module.css';

function RaiseQuery({ setShowModal = () => {} }) {
	return (
		<div className={styles.Container}>
			<IcCFtick style={{ height: '60px', width: '60px' }} />
			<div className={styles.Text}>Your query has been sent successfully!</div>
			<div className={cl `${styles.Text} ${styles.msg}`}>
				Thanks for your feedback. We are working on the resolution of your
				query.
			</div>
			<Button
				onClick={() => setShowModal(false)}
				className="primary md"
				style={{ marginRight: 10, border: 'none' }}
			>
				Okay
			</Button>
		</div>
	);
}

export default RaiseQuery;
