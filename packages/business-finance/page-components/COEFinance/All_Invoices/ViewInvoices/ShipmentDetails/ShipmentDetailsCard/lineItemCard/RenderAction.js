import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RenderAction({
	id = 1,
	isInvoiceApproved = false,
	rejectedItems = {},
	approvedItems = {},
}) {
	if (approvedItems[id] || isInvoiceApproved) {
		return <IcCFtick width="17px" height="17px" />;
	}
	if (rejectedItems[id]) {
		return <IcCFcrossInCircle width="17px" height="17px" />;
	}
	return <div className={styles.circle} />;
}

export default RenderAction;
