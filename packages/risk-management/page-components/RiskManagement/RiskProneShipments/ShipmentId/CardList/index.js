import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardList() {
	return (
		<div style={{ marginTop: '16px' }}>
			<div className={styles.div_container}>
				<div className={styles.container}>
					<div className={styles.shipment_id_text}>
						#839200
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.origin_text}>
							INNSA
						</div>
						<div className={styles.origin_bottom}>
							Nhava Sheva
						</div>
					</div>
					<div>
						<IcMPortArrow height={20} width={20} />
					</div>
					<div className={styles.sub_container}>
						<div className={styles.origin_text}>
							CIABJ
						</div>
						<div className={styles.origin_bottom}>
							Abidjan
						</div>
					</div>
					<div className={styles.vr} />
					<div>
						<div className={styles.not_picked}>
							Container Not Picked Up
						</div>
						<div className={styles.potential_text}>
							Potential Charge: USD 120
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.container}>
						<div className={styles.commodity_text}>
							Commodity : Aloo
						</div>
						<div className={styles.commodity_text}>
							Cargo Value : INR 30,00,000
						</div>
					</div>
				</div>
				<div className={styles.hr} />

			</div>
			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					// onClick={() => handleClick()}
					role="presentation"
				>
					Show more
				</div>
			</div>
		</div>
	);
}

export default CardList;
