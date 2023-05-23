import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useContext } from 'react';

import styles from './styles.module.css';

const Header = ({
	count = 0,
	completedTaskCount = 0,
	hideCompletedTasks = false,
	setHideCompletedTasks = () => {},
	showMyTasks = true,
	setShowMyTasks = () => {},
}) => {
	const { stakeholderConfig = { tasks = {} } = {}, shipment_data } = useContext(ShipmentDetailContext);

	const [showBookingReq, setShowBookingReq] = useState(false);
};

export default Header;
