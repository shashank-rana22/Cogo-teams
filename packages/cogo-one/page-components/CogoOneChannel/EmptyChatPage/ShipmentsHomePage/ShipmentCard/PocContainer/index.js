import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import useListShipmentStakeholders from '../../../../../../hooks/useListShipmentStakeholders';

import PocUser from './PocUser';
import styles from './styles.module.css';

function PocContainer({
	setShowPocDetails = () => {},
	showPocDetails = {},
}) {
	const { id } = showPocDetails;
	const { stakeHoldersData, loading } = useListShipmentStakeholders({ shipmentId: id });

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
				{loading
					? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.spinner_loader}
							height={50}
							width={50}
						/>
					)
					: <PocUser stakeHoldersData={stakeHoldersData} />}
			</div>
		</div>
	);
}

export default PocContainer;
