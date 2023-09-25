import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetCurrentInfo from '../../../../../hooks/useCurrentInfo';

import Loader from './Loader';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ trackingType = 'air', data, loading, refetch }) {
	const {
		combineMileStoneList,
	} = useGetCurrentInfo({ data, trackingType });
	if (loading) {
		return <Loader type={trackingType} />;
	}
	if (!loading && isEmpty(combineMileStoneList)) {
		return (
			<EmptyState />
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<div className={styles.milestone_container}>
					<MilestoneStepper
						combineMileStoneList={combineMileStoneList}
						trackingType={trackingType}
						refetch={refetch}
					/>
				</div>

			</div>
		</div>
	);
}

export default TrackingInfo;
