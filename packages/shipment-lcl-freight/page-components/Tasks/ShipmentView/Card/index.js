import { IcMLcl, IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Card({ shipment_details = {} }) {
	return 	(
		<div className={styles.container}>
			<div className={styles.shipment_detail}>
				<div className={styles.serial_id}>
					{`Shipment Id #${shipment_details?.serial_id}`}
				</div>

				<div className={styles.booking_party}>
					{shipment_details?.booking_party_details?.company_name}
				</div>

				<div className={styles.po_number}>
					{`Po Number: ${shipment_details?.po_number}`}
				</div>
			</div>

			<div className={styles.icon}><IcMLcl /></div>

			<div className={styles.line} />

			<div className={styles.port_pairs}>
				<div className={styles.location}>
					<div className={styles.code}>{`(${shipment_details?.origin_port?.port_code})`}</div>
					<div>{shipment_details?.origin_port?.name}</div>
				</div>

				<div><IcMPortArrow /></div>

				<div className={styles.location}>
					<div className={styles.code}>{`(${shipment_details?.destination_port?.port_code})`}</div>
					<div>{shipment_details?.destination_port?.name}</div>
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.extra_details}>

				<div className={styles.volume}>
					{`${shipment_details?.volume} CBM`}
				</div>

				<div className={styles.inco_term}>{`Inco- ${shipment_details?.inco_term?.toUpperCase()}`}</div>
			</div>
		</div>
	);
}

export default Card;
