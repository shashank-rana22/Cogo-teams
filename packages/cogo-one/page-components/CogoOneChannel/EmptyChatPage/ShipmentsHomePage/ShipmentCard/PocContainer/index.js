import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import useListShipmentStakeholders from '../../../../../../hooks/useListShipmentStakeholders';

import PocUser from './PocUser';
import styles from './styles.module.css';

const POCS = [{}, {}, {}, {}];

function PocContainer({
	setShowPocDetails = () => {},
	showPocDetails = {},
}) {
	const { id } = showPocDetails;
	const { stakeHoldersData } = useListShipmentStakeholders({ shipmentId: id });
	console.log('stakeHoldersData:', stakeHoldersData);

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.header}
				onClick={() => setShowPocDetails({})}
			>
				<IcMArrowBack />
				Back
			</div>

			<div className={styles.title}>
				Initiate Conversation
			</div>

			<div className={styles.poc_users_container}>
				{POCS.map(
					(userDetails) => (
						<PocUser
							userDetails={userDetails}
							key={userDetails?.id}
						/>
					),
				)}
			</div>
		</div>
	);
}

export default PocContainer;
