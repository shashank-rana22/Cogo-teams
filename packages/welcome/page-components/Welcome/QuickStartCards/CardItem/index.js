import { Button } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardItem({ data = {} }) {
	const { icon_url, heading, title, desc, href } = data;
	return (
		<div className={styles.container}>
			<div className={styles.upperhalf}>
				<div className={styles.icon_container}><img src={icon_url} alt="img" width="100%" /></div>
				<div className={styles.card_heading}>{heading}</div>
			</div>
			<div className={styles.lowerhalf}>
				<div className={styles.details_container}>
					<div className={styles.title}>{title}</div>
					<div className={styles.description}>{desc}</div>
				</div>
				<div className={styles.tag_and_link_container}>
					<div className={styles.tag_container}>
						<IcMDocument />
						<span className={styles.tag_count}>1,301</span>
					</div>
					<Button size="md" themeType="linkUi">{href}</Button>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
