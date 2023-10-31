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
		key    : 'item2',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.DARK_BG} alt="" width="100%" />
				<div className={styles.overlay_content}>
					<img src={GLOBAL_CONSTANTS.image_url.laptop_bag} alt="" />

				</div>

				<span className={styles.image_header}>
					<img src={GLOBAL_CONSTANTS.image_url.COGO_ICON} alt="" height="50px" width="255px" />
					<img src={GLOBAL_CONSTANTS.image_url.COPYRIGHT_ICON} alt="" height="10px" />
				</span>
				<span className={styles.home_text_laptop}>Our Brand, Your Style</span>

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
	{
		key    : 'item4',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.spring_collection} alt="" width="100%" />

				<span className={styles.home_text_laptop}>
					NEW
					{' '}
					<br />
					COLLECTION
				</span>
				<span className={styles.home_text_season}>SHOP NOW !</span>

			</div>
		),
	},
];

export default CarouselData;
