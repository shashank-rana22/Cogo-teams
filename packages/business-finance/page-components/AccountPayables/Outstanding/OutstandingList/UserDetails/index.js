import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function UserDetails({ agent = [] }) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	return (
		<>
			<IcMProfile onClick={() => setShowDetailsCard(true)} />
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
								{(agent || []).map((singleagent) => (
									<div key={singleagent?.name} className={styles.containers}>
										<div className={styles.stakeholder}>
											{startCase(singleagent?.stakeholder_type || '-')}
										</div>
										<div className={styles.email}>
											{singleagent?.email || ''}
										</div>
										<div className={styles.name}>
											{singleagent?.name || ''}
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
