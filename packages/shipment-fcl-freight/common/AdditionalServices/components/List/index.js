import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListAdditionalServices from '../../../../hooks/useListAdditionalServices';
import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';
import AddIp from '../AddIp';
import AddRate from '../AddRate';
import Loader from '../Loader';

import AddService from './AddService';
import Info from './Info';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';

function List({ isSeller = false }) {
	const { servicesList, refetchServices, shipment_data, activeStakeholder } = useContext(
		ShipmentDetailContext,
	);

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(8);

	const { list: additionalServiceList, refetch, loading, totalCount } = useListAdditionalServices({ payload: {} });

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const refetchForUpdateSubService = () => {
		setShowModal(false);
		refetch();
	};

	const updateResponse = useUpdateShipmentAdditionalService({
		item,
		refetch : refetchForUpdateSubService,
		showIp  : showModal === 'ip',
	});

	return (
		<div className={styles.container}>

			{loading ? <Loader /> : null}

			{!isEmpty(additionalServiceList) && !loading ? (
				<div className={styles.added_services}>
					{additionalServiceList?.map((serviceListItem) => {
						const status = getStaus({ serviceListItem });

						return (
							<ItemAdded
								key={serviceListItem}
								item={serviceListItem}
								status={status}
								showIp={showModal === 'ip'}
								actionButton={actions({
									status,
									serviceListItem,
									setShowModal,
									setItem,
									shipment_data,
									activeStakeholder,
								})}
								refetch={handleRefetch}
								services={servicesList}
								isSeller={isSeller}
							/>
						);
					})}
				</div>
			) : null}

			{totalCount > 8
				? (
					<div className={styles.show_more}>
						{pageLimit > 8
							? 	(
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(8)}
								>
									Show Less
								</Button>
							) : (
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(16)}
								>
									Show More
								</Button>
							)}
					</div>
				)
				: null}

			{additionalServiceList?.length ? (
				<div className={styles.info_container}>
					<div className={styles.circle} />
					<div className={styles.service_name}>Incidental Services</div>
					<div className={cl` ${styles.circle} ${styles.upsell}`} />
					<div className={styles.service_name}>Upselling Services</div>
					<Info />
				</div>
			) : null}
			<div className={styles.not_added}>
				<Button
					onClick={() => setShowModal('charge_code')}
					disabled={shipment_data?.is_job_closed}
				>
					<div className={styles.add_icon}>+</div>
					Add Additional Services
				</Button>
			</div>

			{showModal === 'add_sell_price'
				&& (
					<Modal
						size="lg"
						show
						onClose={() => setShowModal(false)}
						closeOnOuterClick={false}
						showCloseIcon={!updateResponse.loading}
					>
						<Modal.Header title="Add Sell Price" />
						<Modal.Body>
							<AddRate
								item={item?.serviceListItem}
								status={item?.status}
								setAddSellPrice={setShowModal}
								updateResponse={updateResponse}
								source="add_sell_price"
							/>
						</Modal.Body>
					</Modal>
				)}

			{showModal === 'ip'
				&& (
					<AddIp
						shipmentData={shipment_data}
						setShowIp={setShowModal}
						updateInvoicingParty={(ip) => updateResponse.handleInvoicingParty(ip)}
					/>
				)}

			{showModal === 'charge_code'
				&& (
					<AddService
						shipmentId={shipment_data?.id}
						services={servicesList}
						isSeller={isSeller}
						refetch={refetch}
						setItem={setItem}
						setShowChargeCodes={setShowModal}
					/>
				)}

		</div>
	);
}

export default List;
