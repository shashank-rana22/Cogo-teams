import { Button, Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import styles from './styles.module.css';

const VISIT_COGO_ACADEMY_EXCLUSION_ROLE = 'training';

function CardItem({ data = {} }) {
	const { auth_role_data } = useSelector((state) => state.profile);
	const { role_functions } = auth_role_data || {};

	const { push } = useRouter();

	const { icon_url, heading, title, desc, href, tag } = data;

	const { label, url:redirection_url } = href;

	const { icon: tag_icon, text: tag_text } = tag;

	const openLink = (url) => {
		if (url?.includes('http://') || url?.includes('https://')) {
			window.open(url, '_blank');
		} else {
			push(url, url);
		}
	};

	const isVisitCogoAcademyVisible = title !== 'CogoAcademy'
			|| !role_functions.includes(VISIT_COGO_ACADEMY_EXCLUSION_ROLE);

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

				{isVisitCogoAcademyVisible ? (
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
