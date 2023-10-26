import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../common/LoadingState';
import List from '../../../common/List';
import useGetLeaderbordList from '../../../hooks/useGetLeaderbordList';

import styles from './styles.module.css';
import TopUsers from './TopUsers';

function LeftPanel(props) {
	const { view, dateRange, setUpdatedAt } = props;

	const { list, loading, total_report_count: totalReportCount } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit: 50,
		setUpdatedAt,
	});

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
				: <List tableList={tableList} view={view} totalReportCount={totalReportCount} />}

		</div>
	);
}

export default LeftPanel;
