import { Button, Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

function CardItem({ data = {}, testsCount = 0, coursesCount = 0 }) {
	const { push } = useRouter();

	const { icon_url, heading, title, desc, href, tag } = data;

	const { label } = href;

	const { icon: tag_icon, courses_text: courses_tag_text, assignments_text:assignments_tag_text } = tag;
	let tag_text = tag.text;
	let redirection_url = href.url;

	if (title === 'CogoAcademy') {
		if (coursesCount > ZERO && testsCount > ZERO) {
			tag_text = `${coursesCount} ${courses_tag_text} + ${testsCount} ${assignments_tag_text}`;
			redirection_url = '/learning/course';
		} else if (coursesCount > ZERO && !testsCount > ZERO) {
			tag_text = `${coursesCount} ${courses_tag_text}`;
			redirection_url = '/learning/course';
		} else if (testsCount > ZERO && !coursesCount > ZERO) {
			tag_text = `${testsCount} ${assignments_tag_text}`;
			redirection_url = '/learning/tests/dashboard';
		} else if (!testsCount > ZERO && !coursesCount > ZERO) {
			tag_text = '';
		}
	}

	const openLink = (url) => {
		if (url?.includes('http://') || url?.includes('https://')) {
			window.open(url, '_blank');
		} else {
			push(url, url);
		}
	};

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

				{(tag_text !== '') ? (

					<div className={styles.tag_and_link_container}>
						<div className={styles.tag_container}>
							<img src={tag_icon} alt="img" width={16} />
							<div className={styles.tag_count_container}>
								<Tooltip content={tag_text} placement="top">
									<div className={styles.tag_count_text}>{tag_text}</div>
								</Tooltip>
							</div>
						</div>

						<Button
							type="button"
							size="md"
							themeType="linkUi"
							onClick={() => openLink(redirection_url)}
						>
							{label}
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CardItem;
