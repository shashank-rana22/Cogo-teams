import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import LoadingState from '../../../../../common/LoadingState';
import List from '../../../common/List';
import useGetLeaderbordList from '../../../hooks/useGetLeaderbordList';

import styles from './styles.module.css';
import TopUsers from './TopUsers';

function LeftPanel(props) {
	const { view, dateRange, updatedAt, setUpdatedAt } = props;

	const { list, loading, total_report_count: totalReportCount, trigger } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit: 50,
		setUpdatedAt,
	});

	useEffect(() => {
		const startTime = new Date(updatedAt);
		const targetTime = new Date(startTime.getTime() + 35 * 60 * 1000);

		const currentTime = new Date();
		const timeToWait = targetTime - currentTime;

		if (timeToWait > 0) {
			const timerId = setTimeout(() => {
				trigger();
			}, timeToWait);
			return () => clearTimeout(timerId);
		}

		return () => {};
	}, [trigger, updatedAt]);

	const [firstUser, secondUser, thirdUser, ...tableList] = list;

	const topList = [secondUser, firstUser, thirdUser].filter((item) => !isEmpty(item));

	if (loading) return <div className={styles.container}><LoadingState /></div>;

	if (isEmpty(list)) {
		return (
			<div className={styles.container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
					width={350}
					height={400}
					alt="Empty List"
					className={styles.empty_img}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			<TopUsers topList={topList} view={view} />

			{isEmpty(tableList) ? <p className={styles.empty_list}>No more standings...</p>
				: (
					<List
						tableList={tableList}
						view={view}
						totalReportCount={totalReportCount}
					/>
				)}

		</div>
	);
}

export default LeftPanel;
