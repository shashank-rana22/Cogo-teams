import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListAdditionalServices from '../../../../hooks/useListAdditionalServices';
import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';
import Loader from '../Loader';

import Info from './Info';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';

const AddIp = dynamic(() => import('../AddIp'), { ssr: false });
const AddRate = dynamic(() => import('../AddRate'), { ssr: false });
const AddService = dynamic(() => import('./AddService'), { ssr: false });
const CargoInsurance = dynamic(() => import('./CargoInsurance'), { ssr: false });

const DEFAULT_PAGE_LIMIT = 8;
const SHOW_MORE_PAGE_LIMIT = 16;

const ALLOWED_STAKEHOLDERS = ['booking_agent', 'consignee_shipper_booking_agent',
	'superadmin', 'admin'];

function List({ isSeller = false }) {
	const {
		servicesList, refetchServices = () => {},
		shipment_data, activeStakeholder, primary_service, stakeholderConfig,
	} = useContext(
		ShipmentDetailContext,
	);

	const isAdditionalServiceAllowed = primary_service?.trade_type === 'import'
		? ALLOWED_STAKEHOLDERS.includes(activeStakeholder) : true;

	const canEditCancelService = !!stakeholderConfig?.overview?.can_edit_cancel_service;

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(DEFAULT_PAGE_LIMIT);

	const { list: additionalServiceList, refetch = () => {}, loading, totalCount } = useListAdditionalServices();

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

	const isCargoInsured = servicesList?.some((service) => service?.service_type === 'cargo_insurance_service');

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
									canEditCancelService,
								})}
								refetch={handleRefetch}
								services={servicesList}
								isSeller={isSeller}
							/>
						);
					})}
				</div>
			) : null}

			{totalCount > DEFAULT_PAGE_LIMIT
				? (
					<div className={styles.show_more}>
						{pageLimit > DEFAULT_PAGE_LIMIT
							? 	(
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(DEFAULT_PAGE_LIMIT)}
								>
									Show Less
								</Button>
							) : (
								<Button
									size="md"
									themeType="link"
									onClick={() => setPageLimit(SHOW_MORE_PAGE_LIMIT)}
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

				{isAdditionalServiceAllowed
					? (
						<Button
							onClick={() => setShowModal('charge_code')}
							disabled={shipment_data?.is_job_closed}
						>
							<div className={styles.add_icon}>+</div>
							Add Additional Services
						</Button>
					)
					: null }

				{canEditCancelService ? (
					<Button
						onClick={() => setShowModal('cargo_insurance_service')}
						className={styles.btn_div}
						disabled={!!isCargoInsured}
					>
						<div className={styles.add_icon}>+</div>
						Add Cargo Insurance
					</Button>
				) : null }
			</div>

			{showModal === 'add_sell_price'
				? (
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
				)
				: null}

			{showModal === 'ip'
				? (
					<AddIp
						shipmentData={shipment_data}
						setShowIp={setShowModal}
						updateInvoicingParty={(ip) => updateResponse.handleInvoicingParty(ip)}
					/>
				)
				: null}

			{showModal === 'charge_code'
				? (
					<AddService
						shipmentId={shipment_data?.id}
						services={servicesList}
						isSeller={isSeller}
						refetch={refetch}
						setItem={setItem}
						setShowChargeCodes={setShowModal}
					/>
				)
				: null}

			{showModal === 'cargo_insurance_service' ? (
				<CargoInsurance
					data={shipment_data}
					refetch={refetch}
					setShowModal={setShowModal}
					primary_service={primary_service}
				/>
			) : null}
		</div>
	);
}

export default List;
