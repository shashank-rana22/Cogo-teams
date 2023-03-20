import React from 'react';

import styles from './styles.module.css';

function SingleStrip({
	item = {},
	currentStep = '',
	progressSteps = [],
	count = 1,
}) {
	const status = currentStep === item?.key ? 'active' : 'inactive';

	return (
		<div style={{ width: '100%' }}>
			<div className={`${styles.count} ${styles.status}`}>{count}</div>

			{status === 'success' && (
				<div className={styles.count} style={{ padding: '5px 5px', border: '1px solid  #2C3E50' }}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tick.svg"
						alt="tick"
						width={20}
						height={20}
					/>
				</div>
			)}

			<div
				className={styles.title}
				style={{
					color      : status === 'active' ? '#333333' : '#828282',
					cursor     : count < 1 ? 'pointer' : 'default',
					fontWeight : status === 'active' ? 500 : 'normal',
				}}
			>
				{item?.label}
			</div>
			{count < progressSteps.length ? <div className={styles.line} /> : null}
		</div>
	);
}
export default SingleStrip;
