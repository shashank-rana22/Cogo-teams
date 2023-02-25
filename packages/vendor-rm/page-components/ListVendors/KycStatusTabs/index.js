/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import useSetKycStatus from '../hooks/useSetKycStatus';
import getKycTabsMapping from '../utils/kycTabsMapping';

import styles from './styles.module.css';

function KycStatusTabs({
	setParams = () => {},
	dataStats,
}) {
	const { tagClick = () => {} } = useSetKycStatus({ setParams });

	const { kycTabsMapping } = getKycTabsMapping({ dataStats });

	return (
		<div className={styles.kyc}>
			{
                kycTabsMapping.map((kycTab) => {
                	const { label = '', valueKey = '', kycStatus = '', value } = kycTab;
                	return (
	                    <div
                            role="presentation"
                            className={styles.box}
                            onClick={() => {
                            	tagClick({ kycStatus });
                            }}
	                    >
		                    <div className={styles.label}>{label}</div>
		                    <div className={styles.value}>{value || dataStats?.[valueKey] || 0}</div>
	                    </div>
                	);
                })
            }
		</div>
	);
}

export default KycStatusTabs;
