import { Button } from '@cogoport/components';

import courseData from './coursesData';
import styles from './styles.module.css';

function Courses() {
	const { icon_url, heading, title, description, href, tag } = courseData;

	const { label, url: redirection_url } = href;

	const { icon: tag_icon, text: tag_text } = tag;

	const openLink = (url) => {
		window.open(url, '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.upperhalf}>
				<img src={icon_url} alt="img" width={90} height={74} />

				<div className={styles.card_heading}>{heading}</div>
			</div>

			<div className={styles.lowerhalf}>
				<div className={styles.details_container}>
					<div className={styles.title}>{title}</div>

					<div className={styles.description}>{description}</div>
				</div>

				<div className={styles.tag_and_link_container}>
					<div className={styles.tag_container}>
						<img src={tag_icon} alt="img" width={16} />

						<div className={styles.tag_count_text}>{tag_text}</div>
					</div>

					<Button
						type="button"
						size="md"
						themeType="linkUi"
						onClick={() => openLink(redirection_url)}
					>
						<div className={styles.button_text}>{label}</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Courses;
