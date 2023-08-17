import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../common/EmptyState';

import OverviewCard from './OverviewCard';
import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;

function KamOverview(props) {
	const {
		overviewList = [],
		overviewLoading,
	} = props;

	if (overviewLoading) {
		return (
			<div className={styles.cards}>
				{[ONE, TWO, THREE, FOUR].map((item) => (
					<OverviewCard
						key={item}
						overviewLoading={overviewLoading}
					/>
				))}
			</div>
		);
	}

	if (isEmpty(overviewList)) {
		return (
			<div className={styles.empty_state}>
				<EmptyState
					height={108}
					width={180}
					textSize="16px"
					emptyText="Overview Data Not Found"
				/>
			</div>
		);
	}

	return (
		<div className={styles.cards}>
			{overviewList.map((data) => (
				<OverviewCard
					key={data?.title}
					data={data}
				/>
			))}
		</div>
	);
}

export default KamOverview;
