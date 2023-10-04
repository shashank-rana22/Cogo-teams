import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useListShipmentServices from '../../../../../hooks/useListShipmentServices';

import styles from './styles.module.css';
import TerminalChargeRate from './TerminalChargeRate';

function TerminalChargeReceipt({
	shipmentData = {}, task = {}, refetch = () => {},
	onCancel = () => {}, type = 'terminal',
}) {
	const { servicesList } = useListShipmentServices({ defaultFilters: { shipment_id: shipmentData?.id } });

	const mainServicesData = (servicesList || []).filter((item) => item?.service_type
	=== 'air_freight_service')[GLOBAL_CONSTANTS.zeroth_index];

	const localServicesData = (servicesList || []).find((item) => item?.service_type
	=== 'air_freight_local_service');

	return (
		<div className={styles.container}>
			<TerminalChargeRate
				mainServicesData={mainServicesData}
				refetch={refetch}
				onCancel={onCancel}
				task_id={task?.id}
				shipmentData={shipmentData}
				type={type}
				localServiceId={localServicesData?.id}
			/>
		</div>
	);
}
export default TerminalChargeReceipt;
