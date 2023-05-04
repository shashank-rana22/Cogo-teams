import { Modal, cl, Button } from '@cogoport/components';
import React, { useState } from 'react';
import { startCase } from '@cogoport/utils';
import CargoDetails from '../../../../../commons/CargoDetails';
import PortDetails from '../../../../../commons/PortDetails';
import ShipmentBreif from '../../../../../commons/ShipmentBreif';
import useUpdateShipmentBlDoDetails from '../../../../../hooks/useUpdateShipmentBlDoDetails';
import CustodyShipments from './CustodyShipments';
import BlDetails from './BlDetails';
import Invoices from './Invoices';
import Organizations from './Organizations';
import styles from './styles.module.css';

function ShipmentAudit({ item = {}, closeModal = () => {}, bucket = 'eligible' }) {
	const { freight_service } = item;

	const tabs = {
		invoices  : 'Invoices',
		payments  : `Payments - Total Outstanding  ${item?.invoice_status?.outstanding_amount}`,
		shipments : 'Shipments In Custody',
	};

	const { loading, apiTrigger } = useUpdateShipmentBlDoDetails({});

	const [additionalTab, setAdditionalTab] = useState('invoices');

	return (
		<div className={styles.container}>
			<Modal
				size="fullscreen"
				show
				onClose={closeModal}
				className={styles.modal_container}
			>
				<Modal.Header title = {`Shipments > Audits > ${startCase(bucket)}`} />
				<Modal.Body className={styles.modal_body_content}>
					<>

						<div className={styles.shipment_content_container}>
							<div className={styles.shipment_details}>
								<ShipmentBreif item={item} />
								<PortDetails primary_service={freight_service} />
								<CargoDetails primary_service={freight_service} />
							</div>

							<div className={styles.bl_details}>
								<BlDetails item={item} />
							</div>
						</div>

						<div className={styles.tabs}>
							{Object.keys(tabs).map((tab) => (
								<div
									className={cl`${styles.tab} ${tab === additionalTab ? styles.active : ''}`}
									role="button"
									tabIndex={0}
									onClick={() => setAdditionalTab(tab)}
								>
									{tabs[tab]}
								</div>
							))}
						</div>  
						
						<div className={styles.more_info}> 
						{additionalTab === 'invoices' ? <Invoices /> : null}
						{additionalTab === 'payments' ? <Organizations /> : null}
						{additionalTab === 'shipments' ? <CustodyShipments /> : null}
						</div>
					</>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary">
						Hold
					</Button>
					<Button themeType="primary">
						Approve
					</Button>
				</Modal.Footer>
			</Modal>

			<div>Invoices</div>

		</div>
	);
}

export default ShipmentAudit;
