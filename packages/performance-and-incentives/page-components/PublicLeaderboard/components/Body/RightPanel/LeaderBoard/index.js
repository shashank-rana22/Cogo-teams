import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../common/LoadingState';
import useGetLeaderbordList from '../../../../hooks/useGetLeaderbordList';
import List from '../List';

import styles from './styles.module.css';

function LeaderBoard(props) {
	const { view, dateRange } = props;

	const { list, loading } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit: 3,
	});

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
