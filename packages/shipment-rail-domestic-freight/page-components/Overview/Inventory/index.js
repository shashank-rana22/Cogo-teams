import { Accordion, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ShipmentInventoryContext from '@cogoport/context/page-components/ShipmentInventoryContext';
import { EmptyState } from '@cogoport/surface-modules';
import { useContext, useState, useMemo } from 'react';

import useGetRailShipmentContainerDetail from '../../../hooks/useGetRailShipmentContainerDetail';
import useUpdateRailShipmentContainerDetails from '../../../hooks/useUpdateRailShipmentContainerDetails';

import BulkUpdateRouteModal from './BulkUpdateRouteModal';
import CardHeader from './CardHeader';
import CardItems from './CardItems';
import getUpdateContainerDetailPayload from './helpers/getUpdateContainerDetailPayload';
import useParseContainerData from './helpers/useParseContainerData';
import RoutePlan from './RoutePlan';
import styles from './styles.module.css';

function Inventory() {
	const [globalRouteState, setGlobalRouteState] = useState({
		routeList   : new Set(),
		allSelected : false,
		isChecked   : { index: -1, item: {} },
		status      : '',
	});

	const [showModal, setShowModal] = useState(false);

	const { shipment_data = {}, isGettingShipment } = useContext(ShipmentDetailContext);

	const { data } = useGetRailShipmentContainerDetail({
		defaultParams: {
			shipment_id: shipment_data?.id,
		},
	});

	const { routeList, setRouteList, routeInformation } =	useParseContainerData(data);

	const {
		apiTrigger:updateContainerDetails = () => {},
		loading:updateLoading,
	} = useUpdateRailShipmentContainerDetails({});

	const onSubmit = () => {
		if (globalRouteState?.routeList?.size > 1) {
			setShowModal(true);
			return;
		}
		const payload = getUpdateContainerDetailPayload({ routeList, globalRouteState, setShowModal });
		updateContainerDetails(payload);
	};

	const providerValue = useMemo(
		() => ({
			route       : { routeList, setRouteList, routeInformation },
			globalRoute : { globalRouteState, setGlobalRouteState },
		}),
		[routeList, globalRouteState, routeInformation, setRouteList],
	);

	const routesExist = routeList?.[0]?.route?.length > 0;

	return (
		<ShipmentInventoryContext.Provider value={providerValue}>
			<Accordion title={<div className={styles.title}>Inventory</div>} isOpen>
				{!isGettingShipment ? (
					<div>
						<div>Overview</div>

						{!routesExist
							? (
								<EmptyState
									emptyText="Route Not Found!"
									subEmptyText="Looks like you do not have any records for this section"
								/>
							)
							: (
								<>
									<RoutePlan
										list={{
											route     : routeList?.[0]?.route || [],
											isChecked : false,
										}}
										type="summary"
									/>
									{!routeList?.length
										? (
											<EmptyState
												emptyText="Containers Not Found!"
												subEmptyText={'Looks like you do not have'
													+ ' any records for this section'}
											/>
										)
										: (
											<>
												<CardHeader />

												{(routeList || [])
													.filter((item) => item.name !== 'Transit')
													.map((item, index) => (
														<CardItems
															key={item?.container_number}
															index={index}
															item={item}
														/>
													))}

												<div>
													<Button
														disabled={updateLoading}
														themeType={`${globalRouteState?.routeList?.size > 1
															? 'secondary' : 'primary'}`}
														size="md"
														style={{ marginLeft: '15px' }}
														onClick={onSubmit}
													>
														{globalRouteState?.routeList?.size > 1
															? 'Update Containers' : 'Submit'}
													</Button>
												</div>
											</>
										)}
								</>
							)}
					</div>
				) : null}

				{showModal ? <BulkUpdateRouteModal onClose={() => setShowModal(false)} show={showModal} /> : null}
			</Accordion>
		</ShipmentInventoryContext.Provider>
	);
}

export default Inventory;
