import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetCurrentInfo from '../../../../../hooks/useCurrentInfo';
import useGetSaasAirSubscription from '../../../../../hooks/useGetSaasAirSubscription';
import Loader from '../../../Loader';

import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ id = null }) {
	const { loading, data, refetch } = useGetSaasAirSubscription({ id });

	const { combineMileStoneList } = useGetCurrentInfo({ data, trackingType: 'air' });

	if (loading) {
		return <Loader type="air" />;
	}

	if (isEmpty(combineMileStoneList)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.milestone_container}>
			<MilestoneStepper
				combineMileStoneList={combineMileStoneList}
				refetch={refetch}
			/>
		</div>

	);
}

export default TrackingInfo;
