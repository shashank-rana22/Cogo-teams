import Image from 'next/image';

import styles from './styles.module.css';

function ShippingLine({ shipping_lines = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Preffered Shipping Line</div>
			<div className={styles.flex}>
				{shipping_lines?.map((shipping) => (
					<div className={styles.flex} key={shipping?.shipping_line_logo}>
						<Image
							src={shipping?.shipping_line_logo}
							alt="-"
							width={25}
							height={25}
						/>
						<div className={styles.text}>{shipping?.shipping_line_name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ShippingLine;
