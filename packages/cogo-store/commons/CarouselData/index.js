import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const CarouselData = [
	{
		key    : 'item1',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_ONE} className={styles.car_img} alt="" />
			</div>
		),
	},
	{
		key    : 'item2',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_TWO} className={styles.car_img} alt="" />
			</div>
		),
	},
	{
		key    : 'item3',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_THREE} className={styles.car_img} alt="" />
			</div>
		),
	},
];

export default CarouselData;
