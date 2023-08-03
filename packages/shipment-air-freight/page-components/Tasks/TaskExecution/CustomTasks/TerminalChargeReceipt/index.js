import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import useGetShipmentAirCSROCRSheetData from '../../../../../hooks/useGetShipmentAirCSROCRSheetData';
import useListShipmentServices from '../../../../../hooks/useListShipmentServices';

import styles from './styles.module.css';
import TerminalChargeRate from './TerminalChargeRate';
import UploadTerminalCharge from './UploadTerminalCharge';

const TIME_TO_FETCH_CSR_DATA = 15000;

function TerminalChargeReceipt({ shipmentData = {}, task = {}, refetch = () => {}, onCancel = () => {} }) {
	const [terminalChargeState, setTerminalChargeState] = useState('create');

	const [sheetData, setSheetData] = useState({});

	const { getCSROCRData, data } = useGetShipmentAirCSROCRSheetData({ setTerminalChargeState, sheetData });

	const { servicesList } = useListShipmentServices({ defaultFilters: { shipment_id: shipmentData?.id } });

	const mainServicesData = (servicesList || []).filter((item) => item?.service_type
	=== 'air_freight_service')[GLOBAL_CONSTANTS.zeroth_index];

	useEffect(() => {
		if (terminalChargeState === 'fetching_data') {
			const timeoutId = setTimeout(getCSROCRData, TIME_TO_FETCH_CSR_DATA);
			return () => clearTimeout(timeoutId);
		}
		return () => {};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [terminalChargeState]);

	return (
		<div className={styles.container}>
			{terminalChargeState === 'create'
				? (
					<UploadTerminalCharge
						setTerminalChargeState={setTerminalChargeState}
						mainServicesData={mainServicesData}
						setSheetData={setSheetData}
						sheetData={sheetData}
					/>
				)
				: null}
			{terminalChargeState === 'fetching_data' ? <div> Wait for 15 seconds to fetch the data</div> : null}
			{terminalChargeState === 'data_fetched' ? (
				<TerminalChargeRate
					mainServicesData={mainServicesData}
					sheetData={sheetData}
					refetch={refetch}
					onCancel={onCancel}
					task_id={task?.id}
					shipmentData={shipmentData}
					csr_data={data}
				/>
			) : null}

		</div>
	);
}
export default TerminalChargeReceipt;
