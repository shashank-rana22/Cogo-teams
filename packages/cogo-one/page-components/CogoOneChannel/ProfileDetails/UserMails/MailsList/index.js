import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../Customers/LoadingState';

import MailsCardData from './MailsCardData';
import styles from './styles.module.css';

function MailsList({
	mailsListData = [], handleScroll = () => {},
	mailListLoading = false,
	setActiveMail = () => {},
}) {
	return (
		<div className={styles.container}>
			{(isEmpty(mailsListData) && !mailListLoading)
				? (
					<div className={styles.empty_div}>No Emails Yet..</div>
				) :	(
					<div
						onScroll={handleScroll}
						className={styles.list_container}
					>
						{(mailsListData || []).map((item) => (
							<MailsCardData
								key={item?.id}
								item={item}
								setActiveMail={setActiveMail}
							/>
						))}
						{mailListLoading ? <LoadingState /> : null}
					</div>
				)}
		</div>
	);
}

export default MailsList;
