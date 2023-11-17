import { IcMArrowNext } from '@cogoport/icons-react';

import shippingLineLinks from './shipping-line-links';
import styles from './styles.module.css';

function LinkUI({ ship = {}, setValue = () => {} }) {
	const { short_name = '', logo_url = '', id = '' } = ship;

	const { url = '' } = shippingLineLinks.find(({ shipping_line_name }) => short_name === shipping_line_name) || {};

	return (
		<a
			className={styles.container}
			href={url}
			target="_blank"
			rel="noreferrer"
			onClick={() => setValue('shipping_line_id', id)}
		>
			<div className={styles.detail_container}>
				<img
					src={logo_url}
					alt={short_name}
					height="40px"
					width="40px"
				/>
				<div className={styles.custom_link}>
					{short_name}
				</div>

				<div className={styles.icon_container}>
					<IcMArrowNext height="18px" width="18px" />
				</div>
			</div>
		</a>
	);
}

export default LinkUI;
