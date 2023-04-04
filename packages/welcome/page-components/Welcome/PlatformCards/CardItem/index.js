import { Button, Popover } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function CardItem({ data = {} }) {
	const [visible, setVisible] = useState(false);

	const { icon_url, heading, desc, login_id, password, href } = data;

	const renderEyeButtonText = () => (
		<div className={styles.eye_button_text}>More Details</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.leftpart}>
				<div className={styles.icon}><img src={icon_url} alt="icon" width={60} /></div>
			</div>
			<div className={styles.rightpart}>
				<div className={styles.header_container}>
					<div className={styles.heading}>{heading}</div>
					<div className={styles.more_details_eye_button}>
						<Popover placement="left" trigger="mouseenter" render={renderEyeButtonText()}>
							<IcMInformation onClick={() => setVisible(!visible)} />
						</Popover>
					</div>
				</div>
				<div className={styles.details_container}>
					<div className={styles.description}>{desc}</div>
					<div className={styles.login_details}>{`Login id - ${login_id} , Password - ${password}`}</div>
				</div>
				<Button size="md" themeType="linkUi">{href}</Button>
			</div>
		</div>
	);
}

export default CardItem;
