import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function ShippingLineDetails({ shipping_line = {}, source = '' }) {
	const { short_name = '', logo_url = '' } = shipping_line;

	const shipping_line_logo = source === 'cogo_assured_rate'
		? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : logo_url;

	return (
		<div className={styles.container}>
			{logo_url ? (
				<img
					src={shipping_line_logo}
					alt="shipping line"
					height={60}
					style={{ objectFit: 'cover' }}
				/>
			) : null}

			<div className={styles.name}>{short_name}</div>
		</div>
	);
}

export default ShippingLineDetails;
