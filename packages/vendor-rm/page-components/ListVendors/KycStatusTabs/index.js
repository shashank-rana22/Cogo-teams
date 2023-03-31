import React from 'react';

import compareArrays from '../../../utils/arrayComparison';
import useSetKycStatus from '../hooks/useSetKycStatus';
import getKycTabsMapping from '../utils/kycTabsMapping';

import styles from './styles.module.css';

const color = (kycStatus, params) => {
	const { kyc_status } = params?.filters || {};

	if (!kycStatus && !kyc_status) {
		return { background: '#f9f199' };
	}

	if (typeof kyc_status === 'object') {
		if (kycStatus && compareArrays(kyc_status, kycStatus)) {
			return { background: '#f9f199' };
		}
	} else if (kyc_status === kycStatus) {
		return { background: '#f9f199' };
	}

	return {};
};

function KycStatusTabs({
	params,
	setParams = () => {},
	dataStats,
}) {
	const { tagClick = () => {} } = useSetKycStatus({ setParams });

	const { kycTabsMapping } = getKycTabsMapping({ dataStats });

	return (
		<div className={styles.kyc}>
			{kycTabsMapping.map((kycTab) => {
				const { label = '', valueKey = '', kycStatus, value } = kycTab;

				return (
					<div
						key={valueKey}
						role="presentation"
						className={styles.box}
						onClick={() => {
							tagClick({ kycStatus });
						}}
						style={color(kycStatus, params)}
					>
						<div className={styles.label}>{label}</div>
						<div className={styles.value}>{value || dataStats?.[valueKey] || 0}</div>
					</div>
				);
			})}
		</div>
	);
}

export default KycStatusTabs;
