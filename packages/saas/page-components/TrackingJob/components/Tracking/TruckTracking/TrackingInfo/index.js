import formatDate from '@cogoport/globalization/utils/formatDate';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import useGetCurrentInfo from '../../../../hooks/useCurrentInfo';
import useGetTruckMilestones from '../../../../hooks/useGetTruckMilestones';
import Loader from '../../Loader';

import styles from './styles.module.css';

const MilestoneStepper = dynamic(() => import('./MilestoneStepper'), { ssr: false });

const EmptyState = dynamic(() => import('../../../../common/EmptyState'), { ssr: false });

function TrackingInfo({ id = null }) {
	const { loading, data = {} } = useGetTruckMilestones({ id });

	const { truck_number = '', status = '', intugine_eta } = data?.tripinfo || {};

	const { combineMileStoneList } = useGetCurrentInfo({ data, trackingType: 'surface' });

	const date = useMemo(() => formatDate({
		date       : intugine_eta,
		formatType : 'dateTime',
		separator  : ' ',
	}), [intugine_eta]);

	if (loading) {
		return <Loader type="surface" />;
	}

	if (isEmpty(combineMileStoneList)) {
		return (<EmptyState />);
	}

	return (
		<div className={styles.info_container}>
			<div className={styles.milestone_container}>
				<div>
					Expected Arrival Time
					{' '}
					{date}
				</div>

				<MilestoneStepper
					combineMileStoneList={combineMileStoneList}
					trackingType="surface"
					status={status}
					truck_number={truck_number}
				/>
			</div>
		</div>

	);
}

export default React.memo(TrackingInfo);
