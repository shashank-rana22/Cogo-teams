import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import { DEFAULT_LIST_MAILS_TIMEOUT } from '../../constants/mailConstants';
import useListMail from '../../hooks/useListMail';

import ListMails from './ListMails';
import styles from './styles.module.css';

function MailDetails({
	activeSelect = '',
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

	const { value: list = [] } = listData || {};

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
				<div className={styles.title}>
					{startCase(activeSelect)}
				</div>

				{loading
					? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.colored_loading}
							width={20}
							height={20}
							alt="uploading"
						/>
					) : (
						<IcMRefresh
							className={styles.filter_icon}
							onClick={handleRefresh}
						/>
					)}
			</div>

			{isEmpty(list || []) && !loading ? (
				<div className={styles.empty_div}>
					No Mails Found...
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
