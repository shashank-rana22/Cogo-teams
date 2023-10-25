import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function UserDetails({ item = {} }) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const { kam = [], creditController = [], salesAgent = [], portfolioManager = [] } = item || [];
	const kamData = (kam || []).map((ele) => ({ email: ele?.email, name: ele?.name }));
	const AgentData = (salesAgent || []).map((ele) => ({ email: ele?.email, name: ele?.name }));
	const CcData = (creditController || []).map((ele) => ({ email: ele?.email, name: ele?.name }));
	const portfolioManagerData = (portfolioManager || []).map((ele) => ({ email: ele?.email, name: ele?.name }));
	return (
		<>
			{(kamData.length !== 0 || AgentData.length !== 0 || CcData.length !== 0
			|| portfolioManagerData.length !== 0) && (
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
							{kamData.length !== 0 ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('KAM OWNER' || '-')}
									</div>
									{(kamData || []).map((singleagent) => (
										<div key={singleagent?.name} className={styles.containers}>
											<div className={styles.email}>
												{singleagent?.email || '-'}
											</div>
											<div className={styles.name}>
												{singleagent?.name || '-'}
											</div>
										</div>
									))}
								</div>
							) : null}
							{AgentData.length !== 0 ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('AGENT' || '-')}
									</div>
									{(AgentData || []).map((singleagent) => (
										<div key={singleagent?.name} className={styles.containers}>
											<div className={styles.email}>
												{singleagent?.email || '-'}
											</div>
											<div className={styles.name}>
												{singleagent?.name || '-'}
											</div>
										</div>
									))}
								</div>
							) : null}
							{CcData.length !== 0 ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('CC' || '-')}
									</div>
									{(CcData || []).map((singleagent) => (
										<div key={singleagent?.name} className={styles.containers}>
											<div className={styles.email}>
												{singleagent?.email || '-'}
											</div>
											<div className={styles.name}>
												{singleagent?.name || '-'}
											</div>
										</div>
									))}
								</div>
							) : null}
							{portfolioManagerData.length !== 0 ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('Portfolio Manager' || '-')}

									</div>
									{(portfolioManagerData || []).map((singleagent) => (
										<div key={singleagent?.name} className={styles.containers}>
											<div className={styles.email}>
												{singleagent?.email || '-'}
											</div>
											<div className={styles.name}>
												{singleagent?.name || '-'}
											</div>
										</div>
									))}
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
