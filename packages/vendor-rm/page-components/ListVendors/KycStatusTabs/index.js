/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import useSetKycStatus from '../hooks/useSetKycStatus';
import getKycTabsMapping from '../utils/kycTabsMapping';

import styles from './styles.module.css';

function KycStatusTabs({
	params,
	setParams = () => {},
	dataStats,
}) {
	const { tagClick = () => {} } = useSetKycStatus({ setParams });

	const { kycTabsMapping } = getKycTabsMapping({ dataStats });

	const color = (kycStatus) => {
		if (!kycStatus && !params?.filters?.kyc_status) {
			return { background: '#f9f199' };
		}
		if (kycStatus && params?.filters?.kyc_status === kycStatus) {
			return { background: '#f9f199' };
		}
		return {};
	};

	return (
		<div className={styles.kyc}>
			{
                kycTabsMapping.map((kycTab) => {
                	const { label = '', valueKey = '', kycStatus, value } = kycTab;
                	return (
	                    <div
                            role="presentation"
                            className={styles.box}
                            onClick={() => {
                            	tagClick({ kycStatus });
                            }}
                            style={color(kycStatus)}
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
