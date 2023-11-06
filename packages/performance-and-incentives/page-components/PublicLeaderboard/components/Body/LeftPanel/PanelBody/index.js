import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../../common/LoadingState';
import List from '../../../../common/List';

import styles from './styles.module.css';
import TopUsers from './TopUsers';

function PanelBody(props) {
	const { loading, view, topList, screen, tableList, totalReportCount } = props;

	if (loading) return <LoadingState />;

	if (isEmpty(topList)) {
		return (
			<div className={styles.empty_img}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
					width={350}
					height={400}
					alt="Empty List"
				/>
			</div>
		);
	}

	return (
		<>
			<TopUsers topList={topList} view={view} />

			{isEmpty(tableList) ? <p className={styles.empty_list}>No more standings...</p>
				: (
					<List
						screen={screen}
						tableList={tableList}
						view={view}
						totalReportCount={totalReportCount}
					/>
				)}
		</>
	);
}

export default PanelBody;
