import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import LoadingState from '../../../../common/LoadingState';
import useGetLeaderbordList from '../../../../hooks/useGetLeaderbordList';
import List from '../List';

import styles from './styles.module.css';

function LeaderBoard(props) {
	const { view, updatedAt, dateRange } = props;

	const { list, loading, trigger } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit: 3,
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

	if (loading) return <LoadingState items={3} />;

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

			{isEmpty(list) ? <p className={styles.empty_list}>No standings...</p>
				: <List tableList={list} view={view} />}

		</div>
	);
}

export default LeaderBoard;
