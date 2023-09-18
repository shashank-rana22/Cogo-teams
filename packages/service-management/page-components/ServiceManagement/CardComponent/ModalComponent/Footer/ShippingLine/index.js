import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function ShippingLine({ shipping_lines = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Preffered Shipping Line</div>
			<div className={styles.flex}>
				{shipping_lines?.map((shipping, index) => (
					<div className={styles.flex} key={`${`${index}${uuid()}`}`}>
						<image className={styles.image} src={shipping?.shipping_line_logo} alt="-" />
						<div className={styles.text}>{shipping?.shipping_line_name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ShippingLine;
