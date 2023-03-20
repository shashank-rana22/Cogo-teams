import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useGetPermission from '../../../../hooks/useGetPermission';
import AddIp from '../AddIp';
import AddRate from '../AddRate';

import AddService from './AddService';
import Info from './Info';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';
import useListAdditionalServices from './useListAdditionalServices';

function List({
	services = [],
	isSeller = false,
	activeTab = '',
	refetchServices = () => { },
}) {
	const { isConditionMatches } = useGetPermission();
	const { isShipper } = useSelector(({ general }) => ({
		isShipper : general.query.account_type === 'importer_exporter',
		isMobile  : general.isMobile,
	}));
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [addRate, setAddRate] = useState(false);
	const [showChargeCodes, setShowChargeCodes] = useState(false);
	const [item, setItem] = useState(false);
	const [showIp, setShowIp] = useState(false);

	const { list: additionalServiceList, refetch } = useListAdditionalServices({
		shipment_data,
	});

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	return (
		<div className={styles.container}>
			<div className={styles.not_added}>
				<Button
					onClick={() => setShowChargeCodes(true)}
					disabled={shipment_data?.is_job_closed}
				>
					<div className={styles.add_icon}>+</div>
					Add Additional Charges
				</Button>
			</div>

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
									activeTab,
									status,
									serviceListItem,
									setShowIp,
									setAddRate,
									isShipper,
									setItem,
									isConditionMatches,
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

			{additionalServiceList?.length ? (
				<div className={styles.info_container}>
					<div className={styles.circle} />
					<div className={styles.service_name}>Incidental Services</div>
					<div className={cl` ${styles.circle} ${styles.upsell}`} />
					<div className={styles.service_name}>Upselling Services</div>
					<Info />
				</div>
			) : null}

			{addRate ? (
				<Modal
					size="xl"
					show={addRate}
					onClose={() => setAddRate(null)}
					closable={false}
					placement="top"
					onOuterClick={() => setAddRate(null)}
				>
					<Modal.Body>
						<AddRate
							item={item?.item || addRate}
							shipment_data={shipment_data}
							status={addRate?.status}
							setAddRate={setAddRate}
						/>
					</Modal.Body>
				</Modal>
			) : null}

			{showIp ? (
				<Modal
					size="xl"
					show={showIp}
					className={styles.ip_modal_container}
					onClose={() => setShowIp(null)}
					closable={false}
					placement="top"
					onOuterClick={() => setShowIp(null)}
				>
					<Modal.Header title="ADD INVOICING PARTY" />
					<Modal.Body>
						<AddIp
							shipment_data={shipment_data}
							setShowIp={setShowIp}
							showIp={showIp}
							item={item?.serviceListItem}
						/>
					</Modal.Body>
				</Modal>

			) : null}

			{showChargeCodes ? (
				<Modal
					size="xl"
					show={showChargeCodes}
					onClose={() => setShowChargeCodes(false)}
					placement="top"
					className={styles.modal_container}
				>
					<Modal.Header title="ADD NEW SERVICE" />
					<Modal.Body>
						<AddService
							shipment_id={shipment_data?.id}
							services={services}
							isSeller={isSeller}
							refetch={refetch}
							show={showChargeCodes}
							setShow={setShowChargeCodes}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}

export default List;
