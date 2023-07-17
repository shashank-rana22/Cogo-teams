import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh, IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { DEFAULT_LIST_MAILS_TIMEOUT } from '../../constants/mailConstants';
import useListMail from '../../hooks/useListMail';

import FilterComponent from './FilterComponent';
import ListMails from './ListMails';
import styles from './styles.module.css';

function MailDetails({
	activeSelect = '',
	setActiveMail = () => {},
	activeMail = {},
	activeMailAddress = '',
}) {
	const [searchQuery, setSearchQuety] = useState('');

	const {
		listData = {},
		loading,
		handleScroll = () => {},
		handleRefresh = () => {},
		pagination,
	} = useListMail({ activeSelect, activeMailAddress, searchQuery });

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
			<div className={styles.header_container}>
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
								className={styles.refresh_icon}
								onClick={handleRefresh}
							/>
						)}
				</div>
				<div className={styles.search_container}>
					<Input
						size="sm"
						placeholder="Search"
						value={searchQuery}
						onChange={setSearchQuety}
						prefix={(
							<IcMSearchlight
								height={20}
								width={20}
								fill="#9f9f9f"
							/>
						)}
					/>
					<FilterComponent />
				</div>
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
