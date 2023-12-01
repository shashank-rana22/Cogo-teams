import { IcMArrowRotateLeft, IcMProfile } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function getUniqueData(dataArray) {
	const mutatedArray = [...new Set((dataArray || []).map((ele) => ele?.email))].map((email) => {
		const item = dataArray.find((it) => it.email === email);
		return { email, name: item?.name };
	});

	return mutatedArray;
}

function UserDetails({ item = {} }) {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const { kam = [], creditController = [], salesAgent = [], portfolioManager = [] } = item || [];

	const kamData = getUniqueData(kam);
	const agentData = getUniqueData(salesAgent);
	const ccData = getUniqueData(creditController);
	const portfolioManagerData = getUniqueData(portfolioManager);

	return (
		<>
			{(!isEmpty(kamData) || !isEmpty(agentData) || !isEmpty(ccData)
            || !isEmpty(portfolioManagerData)) && (
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
							{!isEmpty(kamData) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('KAM OWNER')}
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
							{!isEmpty(agentData) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('AGENT')}
									</div>
									{(agentData || []).map((singleagent) => (
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
							{!isEmpty(ccData) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('CC')}
									</div>
									{(ccData || []).map((singleagent) => (
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
							{!isEmpty(portfolioManagerData) ? (
								<div className={styles.body_details}>
									<div className={styles.stakeholder}>
										{startCase('Portfolio Manager')}

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
