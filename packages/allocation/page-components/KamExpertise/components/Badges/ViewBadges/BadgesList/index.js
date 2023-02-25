import { IcCStar } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BadgesList() {
	const BadgeUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg';

	return (
		<div className={styles.badge_list_container}>
			<p className={styles.heading}>Badges List</p>
			<div className={styles.badges_container}>
				<div className={styles.container}>
					<img className={styles.badge} src={BadgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
				<div className={styles.container}>
					<img className={styles.badge} src={BadgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
				<div className={styles.container}>
					<img className={styles.badge} src={BadgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
				<div className={styles.container}>
					<img className={styles.badge} src={BadgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default BadgesList;
