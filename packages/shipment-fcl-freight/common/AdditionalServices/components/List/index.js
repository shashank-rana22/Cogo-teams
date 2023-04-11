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
	const { servicesList, refetchServices, shipment_data } = useContext(
		ShipmentDetailContext,
	);

	const [addSellPrice, setAddSellPrice] = useState(false);
	const [showChargeCodes, setShowChargeCodes] = useState(false);
	const [item, setItem] = useState({});
	const [showIp, setShowIp] = useState(false);
	const [pageLimit, setPageLimit] = useState(8);

	const { list: additionalServiceList, refetch, loading, totalCount } = useListAdditionalServices({
		shipment_data,
		pageLimit,
	});

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const refetchForUpdateSubService = () => {
		setShowIp(false);
		refetch();
	};

	const updateResponse = useUpdateShipmentAdditionalService({
		item,
		setShowIp,
		refetch: refetchForUpdateSubService,
		showIp,
	});

	return (
		<div className={styles.container}>
			{loading && <Loader />}
			{!isEmpty(additionalServiceList) && !loading ? (
				<div className={styles.added_services}>
					{additionalServiceList?.map((serviceListItem) => {
						const status = getStaus({ serviceListItem });

						return (
							<ItemAdded
								item={serviceListItem}
								status={status}
								showIp={showIp}
								actionButton={actions({
									status,
									serviceListItem,
									setShowIp,
									setAddSellPrice,
									setItem,
									shipment_data,
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
					onClick={() => setShowChargeCodes(true)}
					disabled={shipment_data?.is_job_closed}
				>
					<div className={styles.add_icon}>+</div>
					Add Additional Services
				</Button>
			</div>

			{addSellPrice ? (
				<Modal
					size="lg"
					show={addSellPrice}
					onClose={() => setAddSellPrice(null)}
					closable={false}
					placement="top"
					onOuterClick={() => setAddSellPrice(null)}
				>
					<Modal.Body>
						<AddRate
							item={item?.serviceListItem}
							status={item?.status}
							setAddSellPrice={setAddSellPrice}
							updateResponse={updateResponse}
						/>
					</Modal.Body>
				</Modal>
			) : null}

			{showIp ? (
				<AddIp
					shipmentData={shipment_data}
					setShowIp={setShowIp}
					showIp={showIp}
					updateInvoicingParty={(ip) => updateResponse.handleInvoicingParty(ip)}
				/>

			) : null}

			{showChargeCodes ? (
				<AddService
					shipmentId={shipment_data?.id}
					services={servicesList}
					isSeller={isSeller}
					refetch={refetch}
					setItem={setItem}
					showChargeCodes={showChargeCodes}
					setShowChargeCodes={setShowChargeCodes}
				/>

			) : null}

		</div>
	);
}

export default List;
