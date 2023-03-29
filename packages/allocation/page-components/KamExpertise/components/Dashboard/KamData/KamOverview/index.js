import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import OverviewCard from '../OverviewCard';

import styles from './styles.module.css';

function KamOverview(props) {
	const {
		kamLevel = '',
		overviewList = [],
		overviewLoading,
	} = props;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{`KAM ${kamLevel} Overview`}
			</div>

			<div className={styles.cards}>
				{isEmpty(overviewList)
					? (
						<div className={styles.empty_state}>
							<EmptyState
								height={108}
								width={180}
								textSize="16px"
								emptyText="Overview Data Not Found"
							/>
						</div>
					)
					: (
						overviewList.map((data) => (
							<OverviewCard
								key={data.title}
								data={data}
								overviewLoading={overviewLoading}
							/>
						))
					)}
			</div>
		</div>
	);
}

export default KamOverview;
