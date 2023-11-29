import { Placeholder } from '@cogoport/components';

import LinkUI from './LinkUI';
import styles from './styles.module.css';

function ShippingLines({ shippingLines = [], loading = false, setValue = () => {} }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder
					height="232px"
					width="100%"
					margin="0 0 30px 0"
					style={{ borderRadius: '8px' }}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(shippingLines || []).map((ship) => (
				<LinkUI
					key={ship?.short_name}
					ship={ship}
					setValue={setValue}
				/>
			))}
		</div>
	);
}

export default ShippingLines;
