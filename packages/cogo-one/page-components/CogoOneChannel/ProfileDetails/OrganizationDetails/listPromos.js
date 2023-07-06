import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

function ListPromos({ list = [] }) {
	if (isEmpty(list)) {
		return (
			<div className={styles.promotion_cards_empty_state}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_promocode}
					alt="promocode"
					width={200}
					height={200}
				/>
			</div>
		);
	}

	return (
		<div className={styles.promotion_cards}>
			<div className={styles.wrapper}>
				<h3>
					Coming Soon...
				</h3>
			</div>
			<PromocodeThumbnail list={list} />
		</div>
	);
}

export default ListPromos;
