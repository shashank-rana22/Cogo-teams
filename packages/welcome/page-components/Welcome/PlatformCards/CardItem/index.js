import { Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardItem({ data = {} }) {
	const { icon_url, heading, desc, login_id, password, href } = data;
	return (
		<div className={styles.container}>
			<div className={styles.leftpart}>
				<div className={styles.icon}><img src={icon_url} alt="icon" width={60} /></div>
			</div>
			<div className={styles.rightpart}>
				<div className={styles.header_container}>
					<div className={styles.heading}>{heading}</div>
					<div className={styles.more_details_eye_button}><IcMInformation /></div>
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
