import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const LAST_INDEX = 3;

const ARR = [FIRST_INDEX, SECOND_INDEX, LAST_INDEX];

function SopLoader() {
	return (
		<div className={styles.details_container}>
			<div className={styles.sop_header}>
				<Placeholder height="15px" width="100px" />
				<Placeholder height="20px" width="20px" />
			</div>

			<div className={styles.sop_details_container}>
				<div className={styles.company_details}>
					<Placeholder />

					<Placeholder height="20px" width="75px" />
				</div>

				{(ARR || []).map((i) => (
					<div className={i === LAST_INDEX ? styles.last : ''} key={i}>
						<Placeholder height="20px" width="155px" />
						<Placeholder style={{ marginTop: '10px' }} />
					</div>
				))}
			</div>
		</div>
	);
}

export default SopLoader;
