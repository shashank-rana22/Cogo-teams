import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListShipmentAdditionalServices from '../../../../hooks/useListShipmentAdditionalServices';
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

const CargoInsurance = dynamic(() => import('./CargoInsurance'), { ssr: false });

const TOTAL_PAGE_LIMIT = 8;
const PAGE_LIMIT = 100;

function List({ isSeller = false }) {
	const { servicesList, refetchServices, shipment_data, stakeholderConfig, primary_service } = useContext(
		ShipmentDetailContext,
	);

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(TOTAL_PAGE_LIMIT);

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
		refetch : refetchForUpdateSubService,
		showIp  : showModal === 'ip',
	});

	const isCargoInsured = servicesList?.some((service) => service?.service_type === 'cargo_insurance_service');

	return (
		<section className={styles.container}>

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

			{totalCount > TOTAL_PAGE_LIMIT ? (
				<div className={styles.show_more}>
					{pageLimit > TOTAL_PAGE_LIMIT
						? 	(
							<Button
								size="md"
								themeType="link"
								onClick={() => setPageLimit(TOTAL_PAGE_LIMIT)}
							>
								Show Less
							</Button>
						) : (
							<Button
								size="md"
								themeType="link"
								onClick={() => setPageLimit(PAGE_LIMIT)}
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
					<span className={styles.add_icon}>+</span>
					Add Additional Services
				</Button>
				<Button
					onClick={() => setShowModal('cargo_insurance_service')}
					className={styles.btn_div}
					disabled={!!isCargoInsured}
				>
					<span className={styles.add_icon}>+</span>
					Add Cargo Insurance
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

			{showModal === 'ip' && (
				<AddIp
					shipmentData={shipment_data}
					closeModal={closeModal}
					updateInvoicingParty={(ip) => updateResponse.handleInvoicingParty(ip)}
				/>
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

			{showModal === 'cargo_insurance_service' ? (
				<CargoInsurance
					data={shipment_data}
					refetch={refetch}
					setShowModal={setShowModal}
					primary_service={primary_service}
				/>
			) : null}

		</section>
	);
}

export default List;
