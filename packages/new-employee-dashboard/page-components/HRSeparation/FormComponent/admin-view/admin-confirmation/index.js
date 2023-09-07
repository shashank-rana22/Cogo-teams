import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import NotesHrbp from '../common/notes-hr';
import Servicelist from '../common/services-list';

import styles from './styles.module.css';

const SOURCE = 'admin-confirm';

function AdminConfirmed() {
	return (
		<div className={styles.containermain}>
			<div className={styles.maindiv}>
				<div>
					<div className={styles.title}>Admin Clareance</div>
					<div className={styles.subtitle}>Collection of company assets</div>

				</div>

				<div><Button size="md" themeType="primary" className={styles.completedbutton}>Completed</Button></div>
			</div>

			{/* <div className={styles.datediv}>
				<div className={styles.datehead}>Last Working Day</div>
			</div> */}

			<div className={styles.tickdiv}>
				<IcCFtick
					className={styles.tickicon}
				/>
				<span>You have successfully completed your tasks. No further changes are allowed.</span>
			</div>

			<Servicelist source={SOURCE} />
			<NotesHrbp />

		</div>
	);
}

export default AdminConfirmed;
