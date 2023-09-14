import {
	IcCFtick, IcMCrossInCircle,
} from '@cogoport/icons-react';

const NO_LINE_ITEM_CHECKED = 0;

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
	ApproveCheck = 0,
	RejectCheck = 0,
	styles,
	isInvoiceApproved = false,
}) => {
	let labelClassName = null;
	if (length === ApproveCheck || isInvoiceApproved) {
		labelClassName = styles.label_approved;
	} else if (ApproveCheck + RejectCheck === NO_LINE_ITEM_CHECKED) {
		labelClassName = styles.label;
	} else {
		labelClassName = styles.label_rejected;
	}

	return labelClassName;
};

export const getLineItemIcon = ({ length = 0, ApproveCheck = 0, RejectCheck = 0, isInvoiceApproved }) => {
	let iconElement = null;

	if (length === ApproveCheck || isInvoiceApproved) {
		iconElement = <IcCFtick height="17px" width="17px" />;
	} else if (RejectCheck > NO_LINE_ITEM_CHECKED) {
		iconElement = <IcMCrossInCircle height="17px" width="17px" color="red" />;
	}

	return iconElement;
};
