import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../common/LoadingState';

import List from './List';
import styles from './styles.module.css';
import TopUsers from './TopUsers';
import useGetLeaderbordList from './useGetLeaderbordList';

function LeftPanel(props) {
	const { view, dateRange } = props;

	const { list, loading } = useGetLeaderbordList({ view, dateRange });

	const [firstUser, secondUser, thirdUser, ...tableList] = list;

	const topList = [secondUser, firstUser, thirdUser];

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
				: <List tableList={tableList} view={view} />}

		</div>
	);
}

export default LeftPanel;
