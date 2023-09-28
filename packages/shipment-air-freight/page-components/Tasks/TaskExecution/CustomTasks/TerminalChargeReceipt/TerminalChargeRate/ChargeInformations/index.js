import { ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { useEffect } from 'react';

import useGetShipmentAirCSROCRSheetData from '../../../../../../../hooks/useGetShipmentAirCSROCRSheetData';
import UploadTerminalCharge from '../../UploadTerminalCharge';
import ChargeReceiptInformations from '../ChargeReceiptInformations';

import styles from './styles.module.css';

const TIME_TO_FETCH_CSR_DATA = 15000;
const INCREMENT_BY_ONE = 1;

function ChargeInformations({
	index = 0, sheetData = {}, control = {}, errors = {}, setValue = () => {},
	setSheetData = () => {}, mainServicesData = {}, terminalChargeState = {}, setTerminalChargeState = () => {},
}) {
	const {
		getCSROCRData = () => {},
		data = {},
	} = useGetShipmentAirCSROCRSheetData({ index, setTerminalChargeState, sheetData });

	const deleteItem = (keyToDelete) => {
		const newObj = { ...terminalChargeState };
		delete newObj[keyToDelete];
		const SHIFTED_OBJ = {};
		let newIndex = 0;

		Object.keys(newObj).forEach((key) => {
			SHIFTED_OBJ[newIndex] = newObj[key];
			newIndex += INCREMENT_BY_ONE;
		});

		setTerminalChargeState(SHIFTED_OBJ);
	};

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
					setValue={setValue}
					csr_data={data}
				/>
			) : null}
			{index > GLOBAL_CONSTANTS.zeroth_index
			&& (
				<div className={styles.delete_button}>
					<ButtonIcon size="xl" icon={<IcMDelete />} themeType="primary" onClick={() => deleteItem(index)} />
				</div>
			)}
		</div>
	);
}

export default ChargeInformations;
