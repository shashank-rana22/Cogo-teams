import { isEmpty } from '@cogoport/utils';

import MailsCardData from './MailsCardData';
import styles from './styles.module.css';

function MailsList({
	mailsListData = [], handleScroll = () => {},
	mailListLoading = false,
}) {
	return (
		<div>
			{(isEmpty(mailsListData) && !mailListLoading)
				? (
					<div>No Emails Yet..</div>
				) :	(
					<div
						onScroll={handleScroll}
						className={styles.list_container}
					>
						{(mailsListData || []).map((item) => (
							<MailsCardData
								key={item?.id}
								item={item}
							/>
						))}
						{mailListLoading ? <div>Loading</div> : null}
					</div>
				)}
		</div>
	);
}

export default MailsList;
