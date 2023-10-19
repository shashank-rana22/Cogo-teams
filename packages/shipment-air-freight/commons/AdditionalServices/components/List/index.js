import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
import ConfirmTerminalChargeModal from './TerminalChargeModal';

const LESS_PAGE_LIMIT = 8;
const MORE_PAGE_LIMIT = 100;

const THC_DISABLE_STATE = ['init', 'awaiting', 'confirmed_by_service_provider',
	'awaiting_service_provider_confirmation'];

function List({ isSeller = false, source = '' }) {
	const { servicesList, refetchServices, shipment_data, stakeholderConfig } = useContext(
		ShipmentDetailContext,
	);

	const mainFreightService = (servicesList || []).find((service) => service?.service_type === 'air_freight_service');

	const { id = '', is_job_closed_financially = false, inco_term = '' } = shipment_data || {};

	const tradeType = GLOBAL_CONSTANTS.options.inco_term?.[inco_term]?.trade_type;

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(LESS_PAGE_LIMIT);
	const [terminalChargeModal, setTerminalChargeModal] = useState(false);

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
				{tradeType === 'export' ? (
					<Button
						onClick={() => setTerminalChargeModal(true)}
						className={styles.terminal_charges}
						disabled={is_job_closed_financially || THC_DISABLE_STATE.includes(mainFreightService?.state)}
					>
						<div className={styles.add_icon}>+</div>
						Add Terminal Charge
					</Button>
				) : null}

				<Button
					onClick={() => setShowModal('charge_code')}
					disabled={is_job_closed_financially}
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
							setAddRate={setShowModal}
							refetch={refetch}
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
					shipmentId={id}
					services={servicesList}
					isSeller={isSeller}
					refetch={refetch}
					setItem={setItem}
					closeModal={closeModal}
					tradeType={tradeType}
					source={source}
				/>
			)}
			{terminalChargeModal
				? (
					<ConfirmTerminalChargeModal
						terminalChargeModal={terminalChargeModal}
						setTerminalChargeModal={setTerminalChargeModal}
						shipment_id={id}
					/>
				) : null}

		</div>
	);
}

export default List;
