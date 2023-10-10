import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CargoType from './CargoType';
import Comment from './Comment';
import ShippingLine from './ShippingLine';
import styles from './styles.module.css';

function Footer({ service = {} }) {
	const { service: serviceType } = service || {};

	const SERVICES = {
		fcl_freight : 'shipping_line_details',
		air_freight : 'airlines_details',
	};

	return (
		<div className={styles.container}>
			<div className={styles.border_bottom} />
			<div className={styles.flex_div}>
				{!isEmpty(service[SERVICES[serviceType]]) ? (
					<>
						<div className={styles.col}>
							<ShippingLine
								mode={service[SERVICES[serviceType]]}
								serviceType={serviceType}
							/>
						</div>
						<div className={styles.border_right} />
					</>
				) : null}
				<div className={styles.col}>
					<CargoType cargo_types={service.service_data?.cargo_types} />
				</div>
			</div>
			<br />
			<div className={styles.border_bottom} />

			{service.comment ? <Comment message={service.service_comment} /> : null}
		</div>
	);
}

export default Footer;
