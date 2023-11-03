import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const CarouselData = [
	{
		key    : 'item1',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_ONE} alt="" width="100%" />
			</div>
		),
	},
	{
		key    : 'item2',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_TWO} alt="" width="100%" />
			</div>
		),
	},
	{
		key    : 'item3',
		render : () => (
			<div className={styles.carousel}>
				<img src={GLOBAL_CONSTANTS.image_url.CAROUSEL_THREE} alt="" width="100%" />
			</div>
		),
	},
];

export default CarouselData;
