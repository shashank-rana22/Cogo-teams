import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { IcCSendWhatsapp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import BulkCommunicationTemplate from './BulkCommunicaitonTemplate';
import styles from './styles.module.css';

function MobileNumberInput({
	dialNumber = {},
	setDialNumber = () => {},
}) {
	return (
		<>
			<div className={styles.wrap_heading}>
				<div>Enter mobile number</div>
			</div>
			<div className={styles.wrap_mobile_number}>
				<SelectMobileNumber
					value={dialNumber}
					onChange={setDialNumber}
					inputType="number"
					placeholder="Enter number"
				/>
			</div>
			<div className={styles.template_heading}>
				<div>Select a template</div>
			</div>
		</>
	);
}

function UserName({ maskedMobileNumber = '', type = '', userName = '' }) {
	const LOWER_LABEL_MAPPING = {
		showMobileNumber : maskedMobileNumber,
		showUserName     : startCase(userName),
	};

	return (
		<div className={styles.flex_div}>
			<div className={styles.mobile_number}>To</div>
			<IcCSendWhatsapp className={styles.whatsapp_icon} />
			<div className={styles.mobile_number}>{LOWER_LABEL_MAPPING[type] || maskedMobileNumber }</div>
		</div>
	);
}

const HEADER_COMPONENT_MAPPING = {
	whatsapp_new_message_modal : MobileNumberInput,
	voice_call_component       : UserName,
	new_user_outbound          : UserName,
	bulk_communication         : BulkCommunicationTemplate,
};

export function Header({
	type = '',
	dialNumber = {},
	setDialNumber = () => {},
	maskedMobileNumber = '',
	userName = '',
	selectedAutoAssign = {},
}) {
	const Component = HEADER_COMPONENT_MAPPING[type] || null;

	const PROPS_MAPPING = {
		whatsapp_new_message_modal : { dialNumber, setDialNumber },
		voice_call_component       : {
			maskedMobileNumber,
			type: 'showMobileNumber',
		},
		new_user_outbound: {
			type: 'showUserName',
			userName,
		},
		bulk_communication: {
			selectedAutoAssign,
		},
	};

	if (!Component) {
		return null;
	}

	return (
		<Component key={type} {...(PROPS_MAPPING[type] || {})} />
	);
}
export default Header;
