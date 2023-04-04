import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { React } from 'react';

import EmptyState from '../../common/EmptyState';
import useGetRpaMails from '../../hooks/useGetRpaMails';
import Loader from '../List/ListLoader';

import EmailCard from './EmailCard';
import styles from './styles.module.css';

function EmailsRpa({
	activeBox,
	RECIEVE_EMAIL,
	onMailClick,
	source,
	filters,
	isClassified,
	activeMail,
}) {
	const all_filters = {
		...(filters || {}),
		foldername : activeBox,
		source     : RECIEVE_EMAIL,
	};
	const {
		mailApi, page, setPage, search, setSearch, getEmails,
	} =	useGetRpaMails(RECIEVE_EMAIL, 10, source, all_filters, isClassified);

	const handleRefresh = () => {
		if (page === 1) {
			getEmails();
		} else {
			setPage(1);
		}
	};

	const mails = mailApi?.data?.body || [];
	const loading = mailApi?.loading;
	return (
		<div className={styles.main_container}>
			<div className={styles.search_container}>
				<Input
					className="primary md"
					value={search}
					placeholder="Search a mail"
					suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
					onChange={(e) => {
						setSearch(e);
					}}
				/>
			</div>

			<div className={styles.line} />

			<div className={styles.pagination_container}>
				<IcMRefresh
					style={{ marginRight: 10, cursor: 'pointer' }}
					onClick={handleRefresh}
				/>
				<div
					className={page > 1 ? 'primary sm text' : 'secondary sm text'}
					onClick={page > 1 ? () => setPage(page - 1) : null}
					disabled={page === 1}
				>
					&lt;&lt; Prev
				</div>
				<div
					className={
						mails.length >= 10 ? 'primary  sm text' : 'secondary  sm text'
					}
					onClick={mails.length >= 10 ? () => setPage(page + 1) : null}
					style={{ marginLeft: 10 }}
					disabled={mails.length < 10}
				>
					Next &gt;&gt;
				</div>
			</div>

			<div className={styles.card_container}>
				{loading ? (
					<Loader />
				) : (
					(mails || []).map((item) => <EmailCard data={item} onClick={onMailClick} activeMail={activeMail} />)
				)}
				{!loading && isEmpty(mails) && <EmptyState />}
			</div>
		</div>
	);
}

export default EmailsRpa;
