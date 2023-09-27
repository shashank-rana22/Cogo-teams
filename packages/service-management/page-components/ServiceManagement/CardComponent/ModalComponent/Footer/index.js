import { isEmpty } from '@cogoport/utils';

import CargoType from './CargoType';
import Comment from './Comment';
import ShippingLine from './ShippingLine';
import styles from './styles.module.css';

function Footer({ item = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.col}>
				{!isEmpty(item?.shipping_lines) ? (
					<ShippingLine shipping_lines={item?.shipping_line_details || []} />
				) : null}
			</div>
			<div className={styles.border_right} />
			<div className={styles.col}>
				<CargoType cargo_types={item?.service_data?.cargo_types || []} />
			</div>
			<div className={styles.border_right} />
			<div className={styles.col}>
				<Comment service_comment={item?.service_comment} />
			</div>
		</div>
	);
}

export default Footer;
