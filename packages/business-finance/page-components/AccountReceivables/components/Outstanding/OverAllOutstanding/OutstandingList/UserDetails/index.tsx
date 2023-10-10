import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

interface Agent {
	email?: string;
	name?: string;
}

interface ItemContents {
	kam?: Agent;
	creditController?: Agent;
	salesAgent?: Agent;
}

interface ItemProps {
	item?: ItemContents;
}

function UserDetails({ item = {} }: ItemProps) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const { kam = {}, salesAgent = {}, creditController = {} } = item || {};
	const data = [
		{ stakeholder_type: 'KAM Owner', email: kam?.email, name: kam?.name },
		{ stakeholder_type: 'AGENT', email: salesAgent?.email, name: salesAgent?.name },
		{ stakeholder_type: 'CC', email: creditController?.email, name: creditController?.name },
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
