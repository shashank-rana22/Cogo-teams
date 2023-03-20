import { Input, Button } from '@cogoport/components';
import { IcMSearchlight, IcMRefresh } from '@cogoport/icons-react';
import { React } from 'react';

import useGetMails from '../../hooks/useGetMails';

import EmailCard from './EmailCard';
import styles from './styles.module.css';

function Emails({ activeBox, RECIEVE_EMAIL, onMailClick, source, filters }) {
	const { mailApi, page, setPage, search, setSearch, getEmails } = useGetMails(
		RECIEVE_EMAIL,
		activeBox,
		10,
		source,
		filters,
	);

	const handleRefresh = () => {
		if (page === 1) {
			getEmails();
		} else {
			setPage(1);
		}
	};
	const mails = mailApi?.data?.value || [];
	const loading = mailApi?.loading;
	return (
		<div className={styles.main_container}>
			<div className={styles.search_container}>
				<Input
					className="primary md"
					value={search}
					style={{ width: '284px' }}
					placeholder="Search..."
					suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>
			<div className={styles.line} />
			<div className={styles.pagination_container}>
				<IcMRefresh
					style={{ marginRight: 10, cursor: 'pointer' }}
					onClick={handleRefresh}
				/>
				<Button
					className={page > 1 ? 'primary  sm text' : 'secondary  sm text'}
					onClick={page > 1 ? () => setPage(page - 1) : null}
					disabled={page === 1}
				>
					&lt;&lt; Prev
				</Button>
				<Button
					className={
						mails.length >= 10 ? 'primary  sm text' : 'secondary  sm text'
					}
					onClick={mails.length >= 10 ? () => setPage(page + 1) : null}
					style={{ marginLeft: 10 }}
					disabled={mails.length < 10}
				>
					Next &gt;&gt;
				</Button>
			</div>
			<div className={styles.card_container}>
				{loading ? (
					<p>loading emails .....</p>
				) : (
					(mails || []).map((item) => <EmailCard data={item} onClick={onMailClick} />)
				)}
				{/* {!loading && isEmpty(list) && <EmptyState />} */}
			</div>
		</div>
	);
}

export default Emails;
