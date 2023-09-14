import { ButtonIcon, cl, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import ShipmentIcon from '../../../../../common/ShipmentIcon';

import Footer from './Footer';
import styles from './styles.module.css';

function Card({ invoice = {}, shipment_type = '' }) {
	const [showInvoice, setShowInvoice] = useState(false);

	const { billing_address = {}, shipment = {}, services = [] } = invoice || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<div>
						<b>{billing_address?.name || billing_address?.business_name}</b>
						<div className={styles.row}>
							<b>GST Number:</b>
							{' '}
							<Tooltip content={billing_address?.address} placement="bottom">
								<u className={styles.tax_number}>{billing_address?.tax_number}</u>
							</Tooltip>
						</div>
					</div>

				</div>
				<div className={styles.divider} />

				<div className={cl`${styles.width_50} ${styles.row}`}>
					<div>
						<ShipmentIcon shipment_type={shipment_type} height={24} width={24} fill="rgb(150, 226, 162)" />
					</div>

					<div className={styles.custom}>Custom Clearance  </div>
				</div>

				<div>
					Shipment ID :
					{' '}
					<span>{shipment?.serial_id}</span>
				</div>

				<div className={styles.divider} />
				<div className={styles.action_container}>
					<ButtonIcon
						icon={showInvoice ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						themeType="linkUi"
						onClick={() => setShowInvoice(!showInvoice)}
					/>
				</div>
			</div>

			{showInvoice ? <Footer services={services} /> : null}
		</div>
	);
}

export default Card;
