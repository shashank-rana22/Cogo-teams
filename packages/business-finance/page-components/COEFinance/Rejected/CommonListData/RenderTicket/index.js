import { IcMArrowNext } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const START_INDEX = 0;
const MAX_LENGTH = 5;

function RenderTicket({ itemData = {} }) {
	const ticketIds = itemData?.ticketIds;
	const router = useRouter();

	const routeHandler = () => {
		router.push('/ticket-management/my-tickets');
	};

	return (
		<div className={styles.ticket_ids}>
			{ticketIds?.slice(START_INDEX, MAX_LENGTH)?.map((ticketId, index) => (
				<div key={ticketId}>
					<div>
						{index > START_INDEX && ', '}
						{ticketId }
					</div>
				</div>
			))}
			{!isEmpty(ticketIds)
			&& (
				<IcMArrowNext
					onClick={routeHandler}
					className={styles.redirect_button}
				/>
			)}
		</div>
	);
}

export default RenderTicket;
