import { Button } from '@cogoport/components';
import { IcMFtick, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function SeparationForm() {
	const [show, setShow] = useState(true);

	return (
		<div className={styles.main_container}>
			<div className={styles.sub_container_main} aria-hidden onClick={() => setShow(!show)}>

				<div className={styles.sub_container_header}>
					<div className={styles.title}>SEPARATION FORM</div>
					<div className={styles.sub_heading}>Please fill the information carefully</div>
				</div>

				<div className={styles.sub_container_button}>
					<Button size="md" themeType="secondary" className={styles.cancel_btn_text}>
						Request Cancellation
					</Button>
					<IcMArrowDown
						width={22}
						height={22}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>

			<div className={show ? styles.show_separation : styles.hide_separation}>
				<div className={styles.completed_notification_container}>
					<IcMFtick height="22px" width="22px" color="#849E4C" />
					<div className={styles.completed_notification_text}>
						You application has been successfully forwarded to the HR Department.
						You will soon hear from the respective HR.
					</div>
				</div>
			</div>
		</div>
	);
}

export default SeparationForm;
