import { ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useGetShipmentAirCSROCRSheetData from '../../../../../../../hooks/useGetShipmentAirCSROCRSheetData';
import UploadTerminalCharge from '../../UploadTerminalCharge';
import ChargeReceiptInformations from '../ChargeReceiptInformations';
import GenerateIRN from '../GenerateIRN';
import IRNSuccess from '../IRNSuccess';

import styles from './styles.module.css';

const TIME_TO_FETCH_CSR_DATA = 15000;
const INCREMENT_BY_ONE = 1;
const DELETE_STATES = ['create', 'fetching_data', 'data_fetched'];

function ChargeInformations({
	index = 0, type = 'terminal', sheetData = {}, control = {}, errors = {}, setValue = () => {}, entityData = {},
	setSheetData = () => {}, mainServicesData = {}, terminalChargeState = {}, setTerminalChargeState = () => {},
	handleSubmit = () => {}, collectionPartyData = {}, createShipmentAdditionalService = () => {},
}) {
	const [invoiceData, setInvoiceData] = useState([]);
	const [tcValues, setTcValues] = useState({});

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
	}, [getCSROCRData, index, terminalChargeState]);

	return (
		<div className={styles.charge_container}>
			<fieldset>
				<legend>
					{type === 'terminal' ? 'Terminal' : 'Gatepass'}
					{' '}
					Charge Informations
					{' '}
					{index + INCREMENT_BY_ONE}
				</legend>
				{terminalChargeState[index] === 'create'
					? (
						<UploadTerminalCharge
							index={index}
							type={type}
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
						type={type}
						index={index}
						control={control}
						errors={errors}
						setValue={setValue}
						csr_data={data}
						sheetData={sheetData}
						handleSubmit={handleSubmit}
						mainServicesData={mainServicesData}
						entityData={entityData}
						collectionPartyData={collectionPartyData}
						setTerminalChargeState={setTerminalChargeState}
						setInvoiceData={setInvoiceData}
						setTcValues={setTcValues}
					/>
				) : null}
				{terminalChargeState[index] === 'irn_generate' ? (
					<GenerateIRN
						invoiceData={invoiceData}
						tcValues={tcValues}
						createShipmentAdditionalService={createShipmentAdditionalService}
						setTerminalChargeState={setTerminalChargeState}
						index={index}
						sheetId={sheetData?.id}
					/>
				) : null}
				{terminalChargeState[index] === 'irn_success' ? (
					<IRNSuccess />
				) : null}
				{index > GLOBAL_CONSTANTS.zeroth_index && DELETE_STATES.includes(terminalChargeState[index]) ? (
					<div className={styles.delete_button}>
						<ButtonIcon
							size="xl"
							icon={<IcMDelete />}
							themeType="primary"
							onClick={() => deleteItem(index)}
						/>
					</div>
				) : null}
			</fieldset>
		</div>
	);
}

export default ChargeInformations;
