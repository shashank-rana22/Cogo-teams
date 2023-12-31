import React, { useState } from 'react';

import EmptyState from '../common/EmptyState';
import RPA from '../constants/RPA';

import Description from './Description';
import List from './List';
import ListRpa from './ListRpa';
import SideBar from './SideBar';
import styles from './styles.module.css';

/**
 * Render A Mail Box component
 * @param {Object}   props
 * @param {String}  [props.COMPOSE_EMAIL] - Email to use for sending mails
 * @param {String}  [props.RECIEVE_EMAIL] - Email to use for recieve mails for
 * @param {('outlook' | 'cogo_rpa')}  [props.source] - Email Source used to
 * get mails outlook for directly from outlook integrations and cogo_rpa from rpa db
 * @param {Object}  [props.filters] - Email filters to pass for better email filtering
 * @param {String}  [props.pre_subject_text] - Any Text you want to send subject by auto attaching
 * @param {('prefix' | 'suffix')}  [props.subject_position] -
 * @returns
 */

const AIR_SHIPMENT_TYPE = ['air_freight', 'air_freight_local', 'air_customs', 'domestic_air_freight'];

function ShipmentMails({
	source = 'outlook',
	filters = {},
	pre_subject_text = '',
	subject_position = 'prefix',
	shipment_type = '',
}) {
	const [composingEmail, setComposingEmail] = useState(null);
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

	const COMPOSE_EMAIL = AIR_SHIPMENT_TYPE.includes(shipment_type)
		? RPA.AIR_BOOKINGS_COMPOSE_EMAIL : RPA.BOOKINGS_DEFAULT_COMPOSE_EMAIL;
	const RECIEVE_EMAIL = AIR_SHIPMENT_TYPE.includes(shipment_type)
		? RPA.AIR_BOOKINGS_RECEIVE_EMAIL : RPA.BOOKINGS_DEFAULT_RECIEVE_EMAIL;

	if (process.env.NEXT_PUBLIC_REST_BASE_API_URL !== 'https://api.cogoport.com') {
		return (
			<div>
				<EmptyState showContent={{
					heading     : '',
					description : 'Thank you for visiting but this feature is enabled only for production usage.',
				}}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<SideBar
				onCompose={() => {
					setAction('send');
					setComposingEmail({});
				}}
				composingEmail={false}
				activeBox={activeBox}
				setActiveBox={setActiveBox}
				source={source}
			/>

			{source === 'outlook' ? (
				<List
					RECIEVE_EMAIL={RECIEVE_EMAIL}
					activeBox={activeBox}
					onMailClick={handleMailClick}
					source={source}
					filters={filters}
					activeMail={activeMail}
				/>
			) : (
				<ListRpa
					RECIEVE_EMAIL={RECIEVE_EMAIL}
					activeBox={activeBox}
					onMailClick={handleMailClick}
					source={source}
					filters={filters}
					isClassified={isClassified}
					activeMail={activeMail}
				/>
			)}

			<Description
				composingEmail={composingEmail}
				activeMail={activeMail}
				COMPOSE_EMAIL={COMPOSE_EMAIL}
				RECIEVE_EMAIL={RECIEVE_EMAIL}
				setActiveMail={setActiveMail}
				setComposingEmail={setComposingEmail}
				onAction={handleAction}
				action={action}
				pre_subject_text={pre_subject_text}
				subject_position={subject_position}
			/>
		</div>
	);
}

export default ShipmentMails;
