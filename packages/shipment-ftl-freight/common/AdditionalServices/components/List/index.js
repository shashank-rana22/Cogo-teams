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

const MIN_COUNT = 8;
const MAX_COUNT = 16;
function List({ isSeller = false }) {
	const { servicesList, refetchServices, shipment_data, activeStakeholder } = useContext(
		ShipmentDetailContext,
	);

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(MIN_COUNT);

	const { list: additionalServiceList, refetch, loading, totalCount } = useListAdditionalServices({
		shipment_data,
		pageLimit,
	});

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
								key={serviceListItem?.id}
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

			{totalCount > MIN_COUNT
				? (
					<div className={styles.show_more}>
						{pageLimit > MIN_COUNT
							? 	(
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(MIN_COUNT)}
								>
									Show Less
								</Button>
							) : (
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(MAX_COUNT)}
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
			{console.log(servicesList, 'ss')}
			{showModal === 'charge_code'
				&& (
					<AddService
						shipmentId={shipment_data?.id}
						services={servicesList}
						isSeller={isSeller}
						refetch={refetch}
						setItem={setItem}
						setShowChargeCodes={setShowModal}
						source="overview"
					/>
				)}

		</div>
	);
}

export default List;
