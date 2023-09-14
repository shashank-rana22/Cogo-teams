import { IcMDelete, IcMEnquiriesReceived, IcMSettings, IcMShare } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MAPPING = {
	configure : <IcMSettings />,
	share     : <IcMShare />,
	archive   : <IcMEnquiriesReceived />,
	delete    : <IcMDelete />,

};

const Content = ({ setModalInfo, id = '', setShowPopover, shipment_info = {} }) => {
	const clickHandler = (item) => {
		setModalInfo((prev) => ({
			...prev,
			show         : true,
			name         : item,
			shipmentId   : id,
			shipmentInfo : shipment_info,
		}));
		setShowPopover(false);
	};

	return (
		Object.keys(MAPPING).map((item) => (
			<div key={item} className={styles.row} role="presentation" onClick={() => clickHandler(item)}>
				<span className={styles.icon}>{MAPPING?.[item]}</span>
				<span className={styles.text}>{startCase(item)}</span>
			</div>
		))
	);
};

export default Content;
