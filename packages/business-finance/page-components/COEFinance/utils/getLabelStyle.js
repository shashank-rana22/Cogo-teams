import {
	IcCFtick, IcMCrossInCircle,
} from '@cogoport/icons-react';

export const getLabelStyle = ({ CARD_ID = 1, showValue = [], rejected = [], styles, isInvoiceApproved = false }) => {
	let labelClassName = null;
	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		labelClassName = styles.label_approved;
	} else if (rejected.includes(CARD_ID)) {
		labelClassName = styles.label_rejected;
	} else {
		labelClassName = styles.label;
	}
	return labelClassName;
};

export const getIcon = ({ CARD_ID = 1, showValue = [], rejected = [], isInvoiceApproved = false }) => {
	let iconElement = null;

	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		iconElement = <IcCFtick height="17px" width="17px" />;
	} else if (rejected.includes(CARD_ID)) {
		iconElement = <IcMCrossInCircle height="17px" width="17px" />;
	}

	return iconElement;
};

export const getLineItemLabelStyle = ({
	length = 0,
	approveCheck = 0,
	rejectCheck = 0,
	styles = {},
	isInvoiceApproved = false,
}) => {
	let labelClassName = null;
	if (length === approveCheck || isInvoiceApproved) {
		labelClassName = styles.label_approved;
	} else if (rejectCheck) {
		labelClassName = styles.label_rejected;
	} else {
		labelClassName = styles.label;
	}

	return labelClassName;
};

export const getLineItemIcon = ({ length = 0, approveCheck = 0, rejectCheck = 0, isInvoiceApproved }) => {
	let iconElement = null;

	if (length === approveCheck || isInvoiceApproved) {
		iconElement = <IcCFtick height="17px" width="17px" />;
	} else if (rejectCheck) {
		iconElement = <IcMCrossInCircle height="17px" width="17px" color="red" />;
	}

	return iconElement;
};
