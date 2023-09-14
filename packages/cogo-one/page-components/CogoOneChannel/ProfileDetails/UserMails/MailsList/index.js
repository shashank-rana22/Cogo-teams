import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import LoadingState from '../../../Customers/LoadingState';

import MailsCardData from './MailsCardData';
import styles from './styles.module.css';

function MailsList({
	mailsListData = [], handleScroll = () => {},
	mailListLoading = false,
	setSelectedMail = () => {},
}) {
	if (isEmpty(mailsListData) && !mailListLoading) {
		return (
			<EmptyState type="help_desk" />
		);
	}

	return (
		<div className={styles.container}>
			<div
				onScroll={handleScroll}
				className={styles.list_container}
			>
				{(mailsListData || []).map((item) => (
					<MailsCardData
						key={item?.id}
						item={item}
						setSelectedMail={setSelectedMail}
					/>
				))}
				{mailListLoading ? <LoadingState /> : null}
			</div>
		</div>
	);
}

export default MailsList;
