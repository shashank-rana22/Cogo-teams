import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function VendorServices({
	data = {},
}) {
	return (
		<div className={styles.cont}>
			{(data?.services || []).map((service) => (
				<>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Service Category
						</div>
						<div className={styles.bottom}>
							{startCase(service.category)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Service Sub-Category
						</div>
						<div className={styles.bottom}>
							{startCase(service.sub_category)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Cogoport Office
						</div>
						<div className={styles.bottom}>
							{service?.cogoport_office?.display_name}
						</div>
					</div>
					<hr className={styles.dis1} />
				</>
			))}
		</div>

	);
}

export default VendorServices;
