import { useEffect } from 'react';

import useGetShipmentAirCSROCRSheetData from '../../../../../../../hooks/useGetShipmentAirCSROCRSheetData';
import UploadTerminalCharge from '../../UploadTerminalCharge';
import ChargeReceiptInformations from '../ChargeReceiptInformations';

import styles from './styles.module.css';

const TIME_TO_FETCH_CSR_DATA = 15000;
const INCREMENT_BY_ONE = 1;

function ChargeInformations({
	index = 0, sheetData = {}, control = {}, errors = {}, setValue = () => {}, controls = {},
	setSheetData = () => {}, mainServicesData = {}, terminalChargeState = {}, setTerminalChargeState = () => {},
}) {
	const {
		getCSROCRData = () => {},
		data = {},
	} = useGetShipmentAirCSROCRSheetData({ index, setTerminalChargeState, sheetData });

	console.log('sheetData', sheetData);

	useEffect(() => {
		if (terminalChargeState[index] === 'fetching_data') {
			const timeoutId = setTimeout(getCSROCRData, TIME_TO_FETCH_CSR_DATA);
			return () => clearTimeout(timeoutId);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [terminalChargeState[index]]);

	return (
		<div>
			<h3 className={styles.heading}>
				Add Terminal Charge Informations
				{' '}
				{index + INCREMENT_BY_ONE}
			</h3>
			{terminalChargeState[index] === 'create'
				? (
					<UploadTerminalCharge
						index={index}
						setTerminalChargeState={setTerminalChargeState}
						mainServicesData={mainServicesData}
						setSheetData={setSheetData}
						sheetData={sheetData}
					/>
				)
				: null}
			{terminalChargeState[index] === 'fetching_data'
				? <div> Wait for 15 seconds to fetch the data</div>
				: null}
			{terminalChargeState[index] === 'data_fetched' ? (
				<ChargeReceiptInformations
					index={index}
					control={control}
					errors={errors}
					controls={controls}
					setValue={setValue}
					csr_data={data}
				/>
			) : null}

		</div>
	);
}

export default ChargeInformations;
