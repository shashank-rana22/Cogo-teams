import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyTicket from '../EmptyTicket';

import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
import TicketStructureLoader from './TicketStructureLoader';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	setModalData = () => {},
	label = '',
	updateTicketActivity = () => {},
	updateLoading = false,
	listLoading = false,
	reachedBottom = false,
}) {
	const { t } = useTranslation(['myTickets']);

	if (!listLoading && isEmpty(data)) {
		return <EmptyTicket emptyText={`${t('myTickets:no_label')} ${label} ${t('myTickets:tickets_label')}`} />;
	}

	return (
		<div
			className={styles.ticket_box}
			onScroll={(e) => handleScroll(
				{
					clientHeight :	e.target.clientHeight,
					scrollTop    :	e.target.scrollTop,
					scrollHeight :	e.target.scrollHeight,
				},
			)}
		>
			{
				(data || []).map((item = {}) => (
					<TicketStructureBody
						key={item?.ID}
						data={item}
						setModalData={setModalData}
						updateLoading={updateLoading}
						updateTicketActivity={updateTicketActivity}
					/>
				))
			}

			{reachedBottom ? (
				<div className={styles.footer_no_data}>
					{t('myTickets:reached_bottom_label')}
				</div>
			) : null}

			{(listLoading && !reachedBottom) ? <TicketStructureLoader /> : null}
		</div>
	);
}

export default TicketStructure;
