import { cl, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CargoDetailPills from '../../cargo-details/index';
import PortDetails from '../../Details/PortDetails/index';

import Document from './Document/index';
import InvoiceDetail from './InvoiceDetail/index';
import styles from './styles.module.css';

export interface ShipmentDataProps {
	id: string,
	serial_id: string,
}

function ShipmentCard({ shipmentData }) {
	const router = useRouter();
	const [dropDown, setDropDown] = useState('closed');

	return (
		<main className={styles.card}>
			<section className={styles.container}>
				<div className={styles.sub_div}>
					<div className={styles.serial_id}>
						Shipment ID#
						{' '}
						{shipmentData?.serial_id}
					</div>
					<Tooltip
						interactive
						content={(
							<div className={styles.name}>
								{shipmentData?.importer_exporter?.business_name || '-'}
							</div>
						)}
					>
						<div className={styles.orgnization_name}>
							{shipmentData?.importer_exporter?.business_name || '-'}
						</div>
					</Tooltip>
				</div>

				<div className={styles.flex}>
					<PortDetails data={shipmentData} />
				</div>

				<div className={styles.tags}>
					<CargoDetailPills detail={shipmentData} />
				</div>

				<div
					className={styles.flex_div}
					onClick={() => {
						const baseUrl = window.location.origin;
						const newUrl = `${baseUrl}/${router?.query?.partner_id}/shipments/${shipmentData?.id}`;
						window.location.href = newUrl;
					}}
					role="presentation"
				>
					Go to SID →
				</div>
			</section>
			<section className={cl`${styles.drop_down} ${styles.left_dropdown_open}`}>
				<div
					role="button"
					tabIndex={0}
					className={styles.drop_down_block}
					style={{ borderBottom: dropDown === 'invoice' ? '1px solid #b0b0b0' : 'none' }}
					onClick={() => setDropDown((p) => (['closed', 'invoice'].includes(p) ? 'document' : 'closed'))}
				>
					View Documents
					{
						dropDown === 'document'
							? <IcMArrowRotateUp height="17px" width="17px" />
							: <IcMArrowRotateDown height="17px" width="17px" />
					}
				</div>
				<div
					role="button"
					tabIndex={0}
					className={styles.drop_down_block}
					style={{ borderBottom: dropDown === 'document' ? '1px solid #b0b0b0' : 'none' }}
					onClick={() => setDropDown((p) => (['closed', 'document'].includes(p) ? 'invoice' : 'closed'))}
				>
					View Sales Invoice Detail
					{
						dropDown === 'invoice'
							? <IcMArrowRotateUp height="17px" width="17px" />
							: <IcMArrowRotateDown height="17px" width="17px" />
					}
				</div>
			</section>
			{dropDown === 'document' && <Document shipmentId={shipmentData?.id} />}
			{dropDown === 'invoice' && <InvoiceDetail shipmentId={shipmentData?.id} />}
		</main>
	);
}
export default ShipmentCard;
