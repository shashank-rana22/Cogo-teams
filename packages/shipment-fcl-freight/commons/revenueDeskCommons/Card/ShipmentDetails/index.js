import React from 'react';
// import getFormattedPriceCurrency from '../Utils/getFormattedPrice';
import styles from './styles.module.css'

const ShipmentDetails = ({ data = {} }) => {
	let unit = 'Cont.';
	
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.priceText}>
					{
						`${data?.freight_total},
						${data?.freight_currency},`
					}
					<div className={styles.sub}>{unit}</div>
				</div>
			</div>
			<div className={styles.box}>
				{`MBL's`} - {data?.bls_count}
			</div>
		</div>
	);
};

export default ShipmentDetails;