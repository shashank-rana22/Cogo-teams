import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function UserDetails({ item = {} }) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const { kam = {}, creditController = {}, salesAgent = {}, portfolioManager = {} } = item || [];

	return (
		<>
			{(!isEmpty(kam) || !isEmpty(salesAgent) || !isEmpty(creditController)
			|| !isEmpty(portfolioManager)) && (
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
							{!isEmpty(kam) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('KAM OWNER')}
									</div>
									<div key={kam?.name} className={styles.containers}>
										<div className={styles.email}>
											{kam?.email || '-'}
										</div>
										<div className={styles.name}>
											{kam?.name || '-'}
										</div>
									</div>
								</div>
							) : null}
							{!isEmpty(salesAgent) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('AGENT')}
									</div>
									<div key={salesAgent?.name} className={styles.containers}>
										<div className={styles.email}>
											{salesAgent?.email || '-'}
										</div>
										<div className={styles.name}>
											{salesAgent?.name || '-'}
										</div>
									</div>
								</div>
							) : null}
							{!isEmpty(creditController) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('CC')}
									</div>
									<div key={creditController?.name} className={styles.containers}>
										<div className={styles.email}>
											{creditController?.email || '-'}
										</div>
										<div className={styles.name}>
											{creditController?.name || '-'}
										</div>
									</div>
								</div>
							) : null}
							{!isEmpty(portfolioManager) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('Portfolio Manager')}
									</div>
									<div key={portfolioManager?.name} className={styles.containers}>
										<div className={styles.email}>
											{portfolioManager?.email || '-'}
										</div>
										<div className={styles.name}>
											{portfolioManager?.name || '-'}
										</div>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

export default UserDetails;
