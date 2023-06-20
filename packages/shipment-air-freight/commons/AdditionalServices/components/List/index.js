import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListShipmentAdditionalServices from '../../../../hooks/useListShipmentAdditionalServices';
import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';
import AddRate from '../AddRate';
import Loader from '../Loader';

import AddService from './AddService';
import Info from './Info';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';

const LESS_PAGE_LIMIT = 8;
const MORE_PAGE_LIMIT = 100;

function List({ isSeller = false }) {
	const { servicesList, refetchServices, shipment_data, stakeholderConfig } = useContext(
		ShipmentDetailContext,
	);

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(LESS_PAGE_LIMIT);

	const { list: additionalServiceList, refetch, loading, totalCount } = useListShipmentAdditionalServices({
		shipment_data,
		pageLimit,
	});

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const closeModal = () => setShowModal(false);

	const refetchForUpdateSubService = () => {
		closeModal();
		refetch();
	};

	const updateResponse = useUpdateShipmentAdditionalService({
		item,
		refetch: refetchForUpdateSubService,
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
								actionButton={actions({
									status,
									serviceListItem,
									setShowModal,
									setItem,
									stakeholderConfig,
								})}
								refetch={handleRefetch}
								services={servicesList}
								isSeller={isSeller}
							/>
						);
					})}
				</div>
			) : null}

			{totalCount > LESS_PAGE_LIMIT ? (
				<div className={styles.show_more}>
					{pageLimit > LESS_PAGE_LIMIT
						? 	(
							<Button
								size="md"
								themeType="link"
								onClick={() => setPageLimit(LESS_PAGE_LIMIT)}
							>
								Show Less
							</Button>
						) : (
							<Button
								size="md"
								themeType="link"
								onClick={() => setPageLimit(MORE_PAGE_LIMIT)}
							>
								Show More
							</Button>
						)}
				</div>
			) : null}

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

			{showModal === 'add_sell_price' && (
				<Modal
					size="lg"
					show
					onClose={closeModal}
					closeOnOuterClick={false}
					showCloseIcon={!updateResponse.loading}
				>
					<Modal.Header title="Add Sell Price" />
					<Modal.Body>
						<AddRate
							item={item?.serviceListItem}
							status={item?.status}
							closeModal={closeModal}
							updateResponse={updateResponse}
							source="add_sell_price"
						/>
					</Modal.Body>
				</Modal>
			)}

			{showModal === 'charge_code' && (
				<AddService
					shipmentId={shipment_data?.id}
					services={servicesList}
					isSeller={isSeller}
					refetch={refetch}
					setItem={setItem}
					closeModal={closeModal}
				/>
			)}

		</div>
	);
}

export default List;
