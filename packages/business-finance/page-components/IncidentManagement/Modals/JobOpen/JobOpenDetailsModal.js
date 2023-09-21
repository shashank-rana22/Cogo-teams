import React from 'react';

import CostSheet from './components/CostSheet';
import Details from './components/Details';
import TimeLine from './components/TimeLine';
import ViewPdf from './components/ViewPdf';
import styles from './style.module.css';

function JobOpenDetailsModal({ row = {} }) {
	return (
		<div className={styles.containerDisplay}>
			<TimeLine row={row} />
			<CostSheet row={row} />
			<div className={styles.container_view}>
				<ViewPdf row={row} />
				<Details row={row} />
			</div>
		</div>
	);
}
export default JobOpenDetailsModal;
