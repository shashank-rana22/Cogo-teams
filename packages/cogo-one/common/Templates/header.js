import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { IcCSendWhatsapp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

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
					onChange={(val) => setDialNumber(val)}
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
};

export function Header({
	type = '',
	dialNumber = {},
	setDialNumber = () => {},
	maskedMobileNumber = '',
	userName = '',
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
	};

	if (!Component) {
		return null;
	}

	return (
		<Component key={type} {...(PROPS_MAPPING[type] || {})} />
	);
}
export default Header;
