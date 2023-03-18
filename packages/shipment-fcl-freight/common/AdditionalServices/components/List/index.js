import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useGetPermission from '../../../../hooks/useGetPermission';
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
	const [show, setShow] = useState(false);
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
					className="primary sm additional_services_btn"
					onClick={() => setShow(true)}
					disabled={shipment_data?.is_job_closed}
				>
					<div className={styles.add_icon}>+</div>
					Add Additional Charges
				</Button>
			</div>

			{!isEmpty(additionalServiceList) ? (
				<div className={styles.added_services}>
					{additionalServiceList?.map((item) => {
						const status = getStaus({ item });

						return (
							<ItemAdded
								item={item}
								status={status}
								showIp={showIp}
								actionButton={actions({
									activeTab,
									status,
									item,
									setAddRate,
									isShipper,
									isConditionMatches,
									setShowIp,
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

			{/* {addRate && showIp ? (} */}
			{addRate ? (
				<Modal
					size="xl"
					show={addRate}
					onClose={() => setAddRate(null)}
					closable={false}
					placement="top"
					onOuterClick={() => setAddRate(null)}
				>
					<Modal.Header title="ADD INVOICING PARTY" />
					<Modal.Body>
						<AddRate
							item={addRate?.item || addRate}
							shipment_data={shipment_data}
							status={addRate?.status}
							setAddRate={setAddRate}
							refetch={refetch}
							showIp={showIp}
							setShowIp={setShowIp}
						/>
					</Modal.Body>
				</Modal>
			) : null}

			{show ? (
				<Modal
					size="xl"
					show={show}
					onClose={() => setShow(false)}
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
							show={show}
							setShow={setShow}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}

export default List;
