import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

// const columns = [
// 	{ Header: 'Rank', accessor: (_, index) => index + 1 },
// 	{ Header: 'Name', accessor: 'name' },
// 	{ Header: 'Rating', accessor: 'final_rating' },
// ];

function Leaderboard({ rating_list }) {
	// const [openViewAll, setOpenViewAll] = useState(false);

	const [first, second, third] = rating_list || [];

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div>
					Performance Leaderboard
				</div>
				{/* {(rating_list || []).length > 3 && (
					<div className={styles.view_all} onClick={() => setOpenViewAll(true)} aria-hidden>
						View All
						{' '}
						<IcMArrowRight style={{ marginLeft: 4 }} />
					</div>
				)} */}
			</div>
			<div className={cl`${styles.leaderboard_users} ${!second ? styles.one_item : null}`}>
				{second && (
					<div className={styles.rank_user}>
						<div className={styles.rank_2}>
							{second?.name?.[0] || ''}
						</div>
						<div className={styles.rank_2_count}>
							2
						</div>
						<div className={styles.user_name}>
							{second?.name.split(' ')[GLOBAL_CONSTANTS.zeroth_index] || ''}
						</div>
						{second?.final_rating || 0}
					</div>
				)}
				{first && (
					<div className={styles.rank_user}>
						<div className={styles.rank_1}>
							{first?.name?.[0] || ''}
						</div>
						<div className={styles.rank_1_count}>
							1
						</div>
						<div className={styles.user_name}>
							{first?.name?.split(' ')[GLOBAL_CONSTANTS.zeroth_index] || ''}
						</div>
						{first?.final_rating || 0}
					</div>
				)}
				{third && (
					<div className={styles.rank_user}>
						<div className={styles.rank_3}>
							{third?.name?.[0] || ''}
						</div>
						<div className={styles.rank_3_count}>
							3
						</div>
						<div className={styles.user_name}>
							{third?.name?.split(' ')[GLOBAL_CONSTANTS.zeroth_index] || ''}
						</div>
						{third?.final_rating || 0}
					</div>
				)}
			</div>
			{/* {openViewAll && (
				<Modal
					size="lg"
					show={openViewAll}
					onClose={() => setOpenViewAll(false)}
					placement="top"
				>
					<Modal.Header title="Leaderboard" />
					<Modal.Body>
						<Table columns={columns} data={rating_list || []} />
					</Modal.Body>
				</Modal>
			)} */}
		</div>
	);
}

export default Leaderboard;
