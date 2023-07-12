import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function ShippingLineDetails({ shipping_line = {} }) {
	const { short_name = '', logo_url = '' } = shipping_line;

	return (
		<div className={styles.container}>
			{logo_url ? (
				<Image
					src={logo_url}
					alt="shipping line"
					width={60}
					height={60}
				/>
			) : null}

			<div className={styles.name}>{short_name}</div>
		</div>
	);
}

export default ShippingLineDetails;
