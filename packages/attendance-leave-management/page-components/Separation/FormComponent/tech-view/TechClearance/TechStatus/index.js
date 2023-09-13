import { IcMArrowDown, IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function TechStatus({ techClearance = {} }) {
	const [show, setShow] = useState(false);

	const { sub_process_data } = techClearance || {};
	const { serviceList } = sub_process_data || {};
	return (
		<div className={styles.container}>

			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>
					Status
				</span>
				<div className={styles.button_add_service_container}>

					<IcMArrowDown
						width={16}
						height={16}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>
			<div className={show ? styles.item_container : styles.item_container_closed}>
				{serviceList?.map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{startCase(val) || '-'}
						</div>
						<div className={styles.status_detail}>
							<IcMFtick height={18} width={18} color="#849E4C" />
							Access Removed
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TechStatus;
