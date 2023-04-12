import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMArrowNext } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from '../styles.module.css';

function ValidityDisplay({ validity_start = '', validity_end = '' }) {
	return (
		<div className={styles.status_time}>
			<section className={styles.time}>
				<div>{format(validity_start, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}</div>

				<div>{format(validity_start, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}</div>
			</section>

			<div className={styles.middle_div}><IcMArrowNext height={16} width={16} /></div>

			<section className={styles.time}>
				<div>{format(validity_end, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}</div>

				<div>{format(validity_end, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}</div>
			</section>
		</div>

	);
}
export default ValidityDisplay;
