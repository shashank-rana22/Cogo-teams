import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const CarouselData = [
	{
		key    : 'item1',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.DARK_BG} alt="" width="100%" />
				<div className={styles.overlay_content}>
					<img src={GLOBAL_CONSTANTS.image_url.JACKET} alt="" />
				</div>

				<span className={styles.home_text}>Welcome to the</span>
				<span className={styles.home_text2}>CogoMerch store!</span>
				<span className={styles.home_text3}>
					Quality & Affordable clothing
					{' '}
					<br />
					{' '}
					in multiple styles
				</span>

			</div>
		),
	},
	{
		key    : 'item3',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.DARK_BG} alt="" width="100%" />
				<div className={styles.overlay_content_shoes}>
					<img src={GLOBAL_CONSTANTS.image_url.cogo_shoes} alt="" />

				</div>

				<span className={styles.home_text_laptop}>
					Unlock your professional
					{' '}
					<br />
					Wardrobe with the
				</span>
				<span className={styles.home_text_shoes}>Cogoport Merchandise now</span>

			</div>
		),
	},
];

export default CarouselData;
