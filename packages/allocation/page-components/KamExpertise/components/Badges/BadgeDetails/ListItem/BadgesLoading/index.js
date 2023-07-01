import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function BadgeLoading() {
	return (
		<div className={styles.placeholder_container}>
			<div className={styles.number_tag}>
				<Placeholder width="100px" height="20px" />

				<Placeholder width="80px" height="28px" />
			</div>

			<div className={styles.main_card}>
				<div className={styles.card_description}>
					<Placeholder width="180px" height="20px" />

					<Placeholder width="180px" height="20px" margin="12px 0px 0px 0px" />

					<div className={styles.modified}>
						<Placeholder width="45%" height="20px" />
						<Placeholder width="45%" height="20px" />
					</div>
				</div>

				<div className={styles.score_container}>
					<Placeholder width="120px" height="24px" />

					<div className={styles.score_badge}>
						{[1, 2].map((skeletonItem) => (
							<Placeholder
								key={skeletonItem}
								height="120px"
								width="100%"
								margin="20px 20px 0px 0px"
							/>
						))}

						<Placeholder
							height="120px"
							width="100%"
							margin="20px 0px 0px 0px"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default BadgeLoading;
