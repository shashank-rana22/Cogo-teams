import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	// IcCPin,
	IcMPin,
	// IcMShip
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import dateTimeConverter from '../../../../../utils/dateTimeConverter';

import styles from './styles.module.css';

function GroupCard({ singleGroup = {}, teamsProps = {} }) {
	const {
		setActiveTeamCard = () => {},
		activeTeamCard = {},
	} = teamsProps || {};

	const {
		id = '',
		icon = '',
		name = '',
		disdcription = '',
	} = singleGroup || {};
	const lastActive = Date.now();

	const activeCard = id === activeTeamCard?.id;

	const { renderTime } = dateTimeConverter(
		Date.now() - Number(lastActive),
		Number(lastActive),
	);

	const updatePinnedChats = (e, type) => {
		e.stopPropagation();
		console.log('type:', type);
		// updatePin({
		// 	pinnedID: id,
		// 	channelType,
		// 	type,
		// 	firestore,
		// 	userId,
		// });
	};

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => setActiveTeamCard(singleGroup)}
		>
			<div className={cl`${styles.card} ${activeCard ? styles.active_card : ''}`}>
				<div className={styles.info}>
					<div className={styles.group}>
						{icon ? (
							<Image
								src={GLOBAL_CONSTANTS.image_url.teams}
								alt="group"
								width={30}
								height={28}
							/>
						) : null}
						<div className={styles.type}>
							{startCase(name)}
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.label}>
							{disdcription}
						</div>
						<div className={styles.activity_duration}>
							{renderTime}
						</div>
					</div>
				</div>

				<div className={styles.pinned_div}>
					{/* <IcCPin onClick={(e) => updatePinnedChats(e, 'unpin')} /> */}
					<IcMPin onClick={(e) => updatePinnedChats(e, 'pin')} />
				</div>
			</div>

		</div>
	);
}

export default GroupCard;
