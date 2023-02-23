/* eslint-disable jsx-a11y/control-has-associated-label */
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function VendorServices({ data = {} }) {
	return (
		<div className={styles.cont}>
			{data?.services?.map((i) => (

				<>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Service Category
						</div>
						<div className={styles.bottom}>
							{startCase(i.category)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Service Sub-Category
						</div>
						<div className={styles.bottom}>
							{startCase(i.sub_category)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Cogoport Office
						</div>
						<div className={styles.bottom}>
							{/* {item.services[item].} */}
							Mumbai
						</div>
					</div>
					<hr className={styles.dis1} />
				</>
			))}
		</div>

	);
}

export default VendorServices;
