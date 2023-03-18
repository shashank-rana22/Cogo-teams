import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import RPA from './constants/RPA';
import Description from './Description';
import EmailsRpa from './EmailsRpa';
import Sidebar from './Sidebar';
import styles from './styles.module.css';

function Emails() {
	const COMPOSE_EMAIL = RPA.BOOKINGS_DEFAULT_COMPOSE_EMAIL;
	const RECIEVE_EMAIL = RPA.BOOKINGS_DEFAULT_RECIEVE_EMAIL;

	const { shipment_data } = useContext(ShipmentDetailContext);

	const [composingEmail, setComposingEmail] = useState(COMPOSE_EMAIL);
	const [action, setAction] = useState('send');
	const [activeMail, setActiveMail] = useState(null);
	const [activeBox, setActiveBox] = useState('Inbox');
	const [isClassified, setIsClassififed] = useState(false);
	const handleMailClick = (item) => {
		setComposingEmail(false);
		setActiveMail(item);
	};
	const handleAction = (emailItem, newAction) => {
		setAction(newAction);
		setComposingEmail(emailItem);
		if (!emailItem) {
			setActiveMail(null);
			setIsClassififed(!isClassified);
		}
	};

	if (
		process.env.REST_BASE_API_URL === 'https://api.cogoport.com'
		|| process.env.NODE_ENV === 'production'
	) {
		return (
			<div>
				Thank you for visiting but this feature is enabled only for production
				usage.
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Sidebar
				onCompose={() => {
					setAction('send');
					setComposingEmail({});
				}}
				composingEmail={false}
				activeBox={activeBox}
				setActiveBox={setActiveBox}
				source="cogo_rpa"
			/>
			<Description />
		</div>
	);
}

export default Emails;
