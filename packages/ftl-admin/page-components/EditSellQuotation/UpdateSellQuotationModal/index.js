import { cl, Modal } from '@cogoport/components';
import React from 'react';

import Loader from '../../../common/Loader';
import {
	BasicDetails,
	ShipmentIcon,
	DualLocation,
	TruckDetails,
} from '../../../common/ShipmentCard';
import useListShipmentSellQuotation from '../../../hooks/useListShipmentSellQuotation';
import styles from '../Card/styles.module.css';

import InvoicingParties from './InvoicingParties';

function UpdateSellQuotationModal({ showModal = false, setShowModal = () => {}, data = {} }) {
	const { id = '' } = data;
	const { data : sellQuotationData, loading: sellQuotationLoading, refetch } = useListShipmentSellQuotation({ id });
	const {
		invoicing_parties = [], invoicing_party_wise_total = {},
	} = sellQuotationData || {};

	const INVOICING_PARTIES = Object.keys(invoicing_party_wise_total);

	return (
		<div>
			<Modal show={showModal} placement="top" size="xl" onClose={() => setShowModal(false)}>
				<Modal.Header title="Update Sell Quotation" />
				<Modal.Body className={styles.custom_body}>
					<div className={cl`${styles.modal_container} ${styles.modal_upper_container}`}>
						<div className={styles.body_container}>
							<div className={styles.details_container}>
								<div>
									<BasicDetails data={data} />
								</div>
							</div>
							<div className={styles.divider} />

							<div className={styles.icon_container}>
								<ShipmentIcon shipment_type={data?.shipment_type} />
							</div>

							<div className={styles.location_container}>
								<DualLocation data={data} />
							</div>

							<div className={styles.divider} />

							<div className={styles.truck_details}>
								<TruckDetails data={data} />
							</div>

						</div>
					</div>

					{sellQuotationLoading ? <Loader />
						: (
							INVOICING_PARTIES?.map((item) => (
								<InvoicingParties
									regNumber={item}
									key={item}
									invoicingParties={invoicing_parties}
									invoicingPartiesWiseTotal={invoicing_party_wise_total}
									refetch={refetch}
								/>
							))
						)}
				</Modal.Body>
			</Modal>

		</div>
	);
}
export default UpdateSellQuotationModal;
