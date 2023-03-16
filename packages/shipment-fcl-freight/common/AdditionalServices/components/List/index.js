// import useGetPermission from '@cogoport/business-modules/hooks/useGetPermission';
import { Button, Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import { ShipmentDetailContext } from '@cogoport/context';
import AddRate from '../AddRate';

import AddService from './AddService';
import Info from './Info';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStaus from './ItemAdded/get_status';
import styles from './styles.module.css';
// import useAddedList from './useAddedList';

function List({
	services = [],
	isSeller = false,
	activeTab = '',
	refetchServices = () => { },
}) {
	// const { isConditionMatches } = useGetPermission();
	const { scope, isShipper, isMobile } = useSelector(({ general }) => ({
		isShipper: general.query.account_type === 'importer_exporter',
		scope: general.scope,
		isMobile: general.isMobile,
	}));
	const { shipment_data } = useContext(ShipmentDetailContext);

	const isSops = shipment_data?.stakeholder_types?.some((ele) => ['service_ops1', 'service_ops2', 'service_ops3']
		.includes(ele));

	const [addRate, setAddRate] = useState(null);
	const [show, setShow] = useState(false);
	const [showIp, setShowIp] = useState(false);

	// const { list: listAdded, refetch } = useAddedList({
	// 	shipment_id: shipment_data?.id,
	// 	shipment_data,
	// });

	const handleRefetch = () => {
		refetchServices();
		refetch();
	};

	const listAdded = [];
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

			{!isEmpty(listAdded) ? (
				<AddedServices>
					{listAdded?.map((item) => {
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
									scope,
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
				</AddedServices>
			) : null}

			{listAdded?.length ? (
				<Row>
					<Circle />
					<ServiceName>Incidental Services</ServiceName>

					{!isSops ? (
						<>
							<Circle className="upsell" />
							<ServiceName>Upselling Services</ServiceName>
						</>
					) : null}

					<Info />
				</Row>
			) : null}

			{/* {addRate && showIp ? (} */}
			{addRate ? (
				<Modal
					show={addRate}
					onClose={() => setAddRate(null)}
					className="primary lg"
					closable={false}
					onOuterClick={() => setAddRate(null)}
				>
					<AddRate
						item={addRate?.item || addRate}
						shipment_data={shipment_data}
						status={addRate?.status}
						setAddRate={setAddRate}
						// refetch={refetch}
						showIp={showIp}
						setShowIp={setShowIp}
					/>
				</Modal>
			) : null}

			{show ? (
				<Modal
					className="primary lg"
					styles={{ dialog: { width: isMobile ? 360 : 900 } }}
					onClose={() => setShow(false)}
					show={show}
				>
					<AddService
						shipment_id={shipment_data?.id}
						services={services}
						isSeller={isSeller}
						// refetch={refetch}
						show={show}
						setShow={setShow}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default List;
