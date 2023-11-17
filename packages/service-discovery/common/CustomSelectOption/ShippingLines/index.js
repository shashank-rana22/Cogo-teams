import { IcMShip } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ShippingLines(props) {
	const { data, option } = props;

	const {
		business_name = '',
		logo_url = '',
		iata_code = '',
		label,
	} = data || option || {};

	if (label) {
		return label;
	}

	return (
		<div className={styles.container}>
			<span className={styles.sub_container}>
				{logo_url ? (
					<img
						alt="logo"
						src={logo_url}
						style={{ maxWidth: '24px', marginRight: '20px', objectFit: 'cover' }}
					/>
				) : (
					<IcMShip
						width={22}
						height={22}
						fill="#888"
						style={{ marginRight: '22px' }}
					/>
				)}

				<span>{business_name || ''}</span>
			</span>

			{iata_code && <span>{iata_code}</span>}
		</div>
	);
}

export default ShippingLines;
