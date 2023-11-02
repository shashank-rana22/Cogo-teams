import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import useListAdditionalServices from '../../../../hooks/useListAdditionalServices';
import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';
import Loader from '../Loader';
import NewRequestModal from '../NewRequestModal';

import Info from './Info';
import ItemAdded from './ItemAdded';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';

const AddIp = dynamic(() => import('../AddIp'), { ssr: false });
const AddRate = dynamic(() => import('../AddRate'), { ssr: false });
const AddService = dynamic(() => import('./AddService'), { ssr: false });
const CargoInsurance = dynamic(() => import('./CargoInsurance'), { ssr: false });

const DEFAULT_PAGE_LIMIT = 8;
const SHOW_MORE_PAGE_LIMIT = 16;

const ALLOWED_STAKEHOLDERS = ['booking_agent', 'consignee_shipper_booking_agent', 'booking_agent_manager',
	'superadmin', 'admin', 'prod_process_owner', 'coe_head'];

function List({
	isSeller = false,
	source = '',
	collectionPartyList = [],
}) {
	const {
		servicesList = [], refetchServices = () => {},
		shipment_data = {}, activeStakeholder = '', primary_service = {}, stakeholderConfig,
		showRequestCSD, refetch: getShipmentRefetch = () => {},
	} = useContext(ShipmentDetailContext);

	const { id = '', is_job_closed = false, is_job_closed_financially = false, entity_id = '' } = shipment_data || {};
	const { trade_type = '', security_dd_type = '' } = primary_service || {};

	const isEntityIndia = Object.values(ENTITY_MAPPING).filter(
		(item) => item?.id === entity_id,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.code === '301';

	const isAdditionalServiceAllowed = !(primary_service?.trade_type === 'import'
	&& isEntityIndia && !ALLOWED_STAKEHOLDERS.includes(activeStakeholder));

	console.log('activeStakeholder', activeStakeholder);

	const canEditCancelService = !!stakeholderConfig?.overview?.can_edit_cancel_service;

	const [item, setItem] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [pageLimit, setPageLimit] = useState(DEFAULT_PAGE_LIMIT);
	const [showRequestModal, setShowRequestModal] = useState(false);

	const {
		list: additionalServiceList = [],
		refetch = () => {}, loading, totalCount,
	} = useListAdditionalServices({ pageLimit });

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const refetchForUpdateSubService = () => {
		setShowModal(false);
		refetch();
		refetchServices();
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
								key={serviceListItem}
								item={serviceListItem}
								status={status}
								showIp={showModal === 'ip'}
								stakeholderConfig={stakeholderConfig}
								refetch={handleRefetch}
								services={servicesList}
								isSeller={isSeller}
								serviceListItem={serviceListItem}
								setShowModal={setShowModal}
								setItem={setItem}
								activeStakeholder={activeStakeholder}
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
					<span className={styles.service_name}>Incidental Services</span>
					<div className={cl` ${styles.circle} ${styles.upsell}`} />
					<span className={styles.service_name}>Upselling Services</span>
					<Info />
				</div>
			) : null}

			<div className={styles.not_added}>

				{security_dd_type === 'cogoport' && trade_type === 'import' && showRequestCSD ? (
					<Button
						onClick={() => setShowRequestModal(true)}
						className={styles.request_button}
						disabled={is_job_closed_financially}
					>
						Request CSD

					</Button>
				) : null}

				{isAdditionalServiceAllowed
					? (
						<Button
							onClick={() => setShowModal('charge_code')}
							disabled={is_job_closed_financially}
						>
							<span className={styles.add_icon}>+</span>
							Add Additional Services
						</Button>
					)
					: null }

				{canEditCancelService ? (
					<Button
						onClick={() => setShowModal('cargo_insurance_service')}
						className={styles.btn_div}
						disabled={!!isCargoInsured || is_job_closed}
					>
						<span className={styles.add_icon}>+</span>
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
								refetch={refetch}
								source="add_sell_price"
								refetchServices={refetchServices}

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
						shipmentId={id}
						services={servicesList}
						isSeller={isSeller}
						refetch={refetch}
						setItem={setItem}
						setShowChargeCodes={setShowModal}
						source={source}
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

			{showRequestModal ? (
				<NewRequestModal
					showRequestModal={showRequestModal}
					setShowRequestModal={setShowRequestModal}
					collectionPartyList={collectionPartyList}
					getShipmentRefetch={getShipmentRefetch}
				/>
			) : null}
		</section>
	);
}

export default List;
