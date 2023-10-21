import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function UserDetails({ item = {} }) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const { kam = [], creditController = [], salesAgent = [] } = item || [];
	// const { kam = {}, salesAgent = {}, creditController = {} } = item || {};
	const data = [
		{
			stakeholder_type : 'KAM Owner',
			email            : kam[GLOBAL_CONSTANTS.zeroth_index]?.email,
			name             : kam[GLOBAL_CONSTANTS.zeroth_index]?.name,
		},
		{
			stakeholder_type : 'AGENT',
			email            : salesAgent[GLOBAL_CONSTANTS.zeroth_index]?.email,
			name             : salesAgent[GLOBAL_CONSTANTS.zeroth_index]?.name,
		},
		{
			stakeholder_type : 'CC',
			email            : creditController[GLOBAL_CONSTANTS.zeroth_index]?.email,
			name             : creditController[GLOBAL_CONSTANTS.zeroth_index]?.name,
		},
	];
	const allEmpty = data.every((el) => !el.email && !el.name);
	return (
		<>
			{!allEmpty && (
				<div className={styles.download_icon_div}>
					<IcMProfile
						onClick={() => setShowDetailsCard(true)}
						fill="black"
					/>
				</div>
			)}
			{showDetailsCard ? (
				<>
					<div className={styles.invoice_details_container_bg} />
					<div className={styles.invoice_details_container}>
						<div className={showDetailsCard ? styles.enter_left : styles.exit_left}>
							<div className={styles.content_caret}>
								<div
									className={styles.icon_container}
									onClick={() => {
										setShowDetailsCard(false);
									}}
									role="presentation"
								>
									<IcMArrowRotateLeft />
								</div>
								<div className={styles.header_details}>
									DETAILS
								</div>
							</div>
							<div className={styles.body_details}>
								{(data || []).map((singleagent) => (
									<div key={singleagent?.name} className={styles.containers}>
										<div className={styles.stakeholder}>
											{startCase(singleagent?.stakeholder_type || '-')}
										</div>
										<div className={styles.email}>
											{singleagent?.email || '-'}
										</div>
										<div className={styles.name}>
											{singleagent?.name || '-'}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

export default UserDetails;
