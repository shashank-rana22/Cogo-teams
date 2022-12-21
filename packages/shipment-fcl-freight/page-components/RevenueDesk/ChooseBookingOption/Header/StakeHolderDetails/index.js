import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';
// import useListInternalStakeholders from '../../../../../hooks/revenueDeskHooks/useListInternalStakeholders';
// import StakeholderDetails from '../../../../../hooks/revenueDeskHooks/useListInternalStakeholders.json';
import styles from './styles.module.css';

function StakeHolderDetails({ data }) {
	const internalStakeHoldersList = StakeholderDetails;

	useListInternalStakeholders({
		shipment_id: data?.id,
	});

	const mainServiceStakeholders = internalStakeHoldersList?.filter(
		(item) => item?.service_type === `${data?.shipment_type}_service`
			|| isEmpty(item?.service_type),
	);
	if (isEmpty(mainServiceStakeholders)) {
		return null;
	}

	return (
		<div className={styles.stakeHolderCon}>
			{(mainServiceStakeholders || []).map((item) => (item?.stakeholder_type !== 'service_ops2' ? (
				<div className={styles.StakeHolderDiv}>
					<div className={(styles.stakeHolderKey)}>
						{startCase(item?.stakeholder_type)}
						{' '}
						:
					</div>

					<div className={styles.stakeHolderValue}>
						{startCase(item?.user?.name)}
					</div>
				</div>
			) : null))}
		</div>
	);
}

export default StakeHolderDetails;