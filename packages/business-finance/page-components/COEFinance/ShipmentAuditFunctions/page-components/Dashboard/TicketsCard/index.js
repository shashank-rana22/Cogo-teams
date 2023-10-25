import { Loader } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMTicket } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import Tickets from './Tickets';

function TicketsCard({
	serialId = '',
	onTabClick = () => {},
	loadingShipment = false,
	tab = {},
}) {
	return (
		<div className={styles.card}>
			<div
				className={styles.card_upper}
				onClick={() => onTabClick({ tabName: 'ticketsTab' })}
				role="presentation"
			>
				<div className={styles.sub_container}>
					Tickets
					<IcMTicket height="17px" width="17px" />
					{loadingShipment && (
						<Loader />
					)}
				</div>

				<div
					className={styles.caret}
					role="presentation"
				>
					{tab.ticketsTab ? (
						<IcMArrowRotateUp height="17px" width="17px" />
					) : (
						<IcMArrowRotateDown height="17px" width="17px" />
					)}
				</div>
			</div>
			{tab.ticketsTab && <div className={styles.hr} />}
			<div className={styles.tickets}>
				{tab?.ticketsTab && <Tickets serialId={serialId} />}
				{' '}
			</div>
		</div>
	);
}

export default TicketsCard;
