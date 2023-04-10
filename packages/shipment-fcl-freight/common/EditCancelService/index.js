import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EditCancelService({ state = '' }) {
	const [show, setShow] = useState(false);

	const content = (
		<div className={styles.dialog_box}>
			<div
				className={styles.text}
				role="button"
				tabIndex={0}
				onClick={() => setShow(true)}
			>
				Edit
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<Popover
				interactive
				placement="bottom"
				theme="light"
				trigger="click"
				content={content}
			>
				<div className={styles.more_svg}>
					<IcMOverflowDot
						className={`${state === 'cancelled' ? styles.cancel : styles.service_exist}`}
					/>
				</div>
			</Popover>

		</div>
	);
}

export default EditCancelService;
