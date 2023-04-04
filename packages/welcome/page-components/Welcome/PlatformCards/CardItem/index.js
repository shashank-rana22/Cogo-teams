import { Button, Tooltip } from '@cogoport/components';
import openDocument from '@cogoport/core/helpers/openDocument';
import { IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardItem({ data = {} }) {
	const { icon_url, heading, desc, login_id, password, href, eye_button_text } = data;

	const { label, url } = href;

	return (
		<div className={styles.container}>

			<div className={styles.leftpart}>
				<div className={styles.icon}><img src={icon_url} alt="icon" width={60} /></div>
			</div>

			<div className={styles.rightpart}>
				<div className={styles.header_container}>

					<div className={styles.heading}>{heading}</div>

					<div className={styles.more_details_eye_button}>
						<Tooltip
							placement="left"
							content={(<div className={styles.eye_button_text}>{eye_button_text}</div>)}
						>
							<IcMInformation />
						</Tooltip>
					</div>

				</div>
				<div className={styles.details_container}>

					<div className={styles.description}>{desc}</div>

					<div className={styles.login_details}>
						<span>
							<strong>Login id - </strong>
							{' '}
							{login_id}
						</span>

						<span>
							<strong>Password - </strong>
							{password}
						</span>
					</div>

				</div>

				<Button size="md" themeType="linkUi" onClick={() => openDocument(url)}>{label}</Button>
			</div>
		</div>
	);
}

export default CardItem;
