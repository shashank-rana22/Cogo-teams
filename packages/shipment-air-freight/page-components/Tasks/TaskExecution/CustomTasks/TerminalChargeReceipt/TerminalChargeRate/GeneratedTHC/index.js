import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import GenerateIRN from '../GenerateIRN';
import IRNSuccess from '../IRNSuccess';

import styles from './styles.module.css';

const INCREMENT_BY_ONE = 1;

function GeneratedTHC({ type = 'terminal', index = 0, item = {}, createShipmentAdditionalService = () => {} }) {
	const [terminalChargeState, setTerminalChargeState] = useState({ [index]: 'irn_generate' });
	const { status = '', csr_sheet_id = '', id = '' } = item || {};

	return (
		<div className={styles.generated_thc_container}>
			<fieldset>
				<legend>
					{type === 'terminal' ? 'Terminal' : 'Gatepass'}
					{' '}
					Charge Informations
					{' '}
					{index + INCREMENT_BY_ONE}
				</legend>
				{status === 'init' ? (
					<GenerateIRN
						invoiceData={[id]}
						tcValues={{
							...item?.line_items[GLOBAL_CONSTANTS.zeroth_index],
							receipt_reference_no: item?.receipt_reference_no,
						}}
						createShipmentAdditionalService={createShipmentAdditionalService}
						setTerminalChargeState={setTerminalChargeState}
						index={index}
						sheetId={csr_sheet_id}
					/>
				) : null}
				{terminalChargeState[index] === 'irn_success' || status === 'finance_approved' ? (
					<IRNSuccess />
				) : null}
			</fieldset>

		</div>
	);
}

export default GeneratedTHC;
