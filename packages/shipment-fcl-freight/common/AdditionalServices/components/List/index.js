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

function List({
	services = [],
	isSeller = false,
	refetchServices = () => { },
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [addSellPrice, setAddSellPrice] = useState(false);
	const [showChargeCodes, setShowChargeCodes] = useState(false);
	const [item, setItem] = useState({});
	const [showIp, setShowIp] = useState(false);

	const { list: additionalServiceList, refetch, loading } = useListAdditionalServices({
		shipment_data,
	});

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const updateResponse = useUpdateShipmentAdditionalService({
		item,
		setShowIp,
		refetch,
		showIp,
	});

	return (
		<div className={styles.container}>
			{loading && <Loader />}
			{!isEmpty(additionalServiceList) ? (
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
								services={services}
								isSeller={isSeller}
							/>
						);
					})}
				</div>
			) : null}

			<div className={styles.not_added}>
				<Button
					onClick={() => setShowChargeCodes(true)}
					disabled={shipment_data?.is_job_closed}
				>
					<div className={styles.add_icon}>+</div>
					Add Additional Charges
				</Button>
			</div>

			{additionalServiceList?.length ? (
				<div className={styles.info_container}>
					<div className={styles.circle} />
					<div className={styles.service_name}>Incidental Services</div>
					<div className={cl` ${styles.circle} ${styles.upsell}`} />
					<div className={styles.service_name}>Upselling Services</div>
					<Info />
				</div>
			) : null}

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
					services={services}
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
