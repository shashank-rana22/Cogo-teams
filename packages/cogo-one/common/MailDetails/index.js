import { IcMArrowLeft, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import { DEFAULT_LIST_MAILS_TIMEOUT } from '../../constants/MAIL_CONSTANT';
import useListMail from '../../hooks/useListMail';

import ListMails from './ListMails';
import styles from './styles.module.css';

function MailDetails({
	activeSelect = '',
	setActiveSelect = () => {},
	setActiveMail = () => {},
	activeMail = {},
	activeMailAddress = '',
}) {
	const {
		listData = {},
		loading,
		handleScroll = () => {},
		handleRefresh = () => {},
		pagination,
	} = useListMail({ activeSelect, activeMailAddress });

	const {
		value: list = [],
	} = listData || {};

	const handleClick = () => {
		setActiveSelect(null);
		setActiveMail({});
	};

	useEffect(() => {
		let interval = '';

		if (activeSelect) {
			interval = setInterval(() => {
				handleRefresh();
			}, DEFAULT_LIST_MAILS_TIMEOUT);
		}

		return () => clearInterval(interval);
	}, [handleRefresh, activeSelect, pagination]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div
					role="presentation"
					className={styles.left_div}
					onClick={handleClick}
				>
					<IcMArrowLeft className={styles.arrow_left} />

					<div className={styles.title}>
						{startCase(activeSelect)}
					</div>
				</div>

				<IcMRefresh
					className={styles.filter_icon}
					onClick={handleRefresh}
				/>
			</div>

			{isEmpty(list || []) && !loading ? (
				<div className={styles.empty_div}>
					No Data Found...
				</div>
			) : (
				<ListMails
					list={list}
					loading={loading}
					activeMail={activeMail}
					handleScroll={handleScroll}
					setActiveMail={setActiveMail}
				/>
			)}
		</div>
	);
}

export default MailDetails;
