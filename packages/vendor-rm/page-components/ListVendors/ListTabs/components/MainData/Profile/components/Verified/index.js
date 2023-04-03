import { IcCFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COMPONENT_PROPS_MAPPING = {
	verified: {
		style: {
			background : '#E2FFE7',
			border     : '1px solid #89E297',
		},
		color : '#67c676',
		icon  : <IcCFtick />,
	},

	rejected: {
		style: {
			background    : '#fdcfcf',
			border        : '1px solid #ED3726',
			flexDirection : 'column',
			color         : '#ED3726',
			padding       : 12,
		},
		color : '#ED3726',
		icon  : <IcMCrossInCircle />,
	},

	pending_from_user: {
		style: {
			background : '#fdd9b5',
			border     : '1px solid #F68B21',
		},
		color : '#F68B21',
		icon  : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc-pending-icon.svg"
			alt="pending"
		/>,
	},

	pending_verification: {
		style: {
			background : '#fdd9b5',
			border     : '1px solid #F68B21',
		},
		color : '#F68B21',
		icon  : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc-pending-icon.svg"
			alt="pending"
		/>,
	},
};

function Verified({ vendor_details = {} }) {
	const {
		kyc_rejection_reason,
		kyc_status,
		kyc_rejection_feedbacks = [],
	} = vendor_details || {};

	return (
		<div
			className={styles.main}
			style={COMPONENT_PROPS_MAPPING[kyc_status].style}
		>
			<div
				className={styles.icon}
			>
				{COMPONENT_PROPS_MAPPING[kyc_status].icon}
			</div>

			<div
				className={styles.dis}
				style={{
					color: COMPONENT_PROPS_MAPPING[kyc_status].color,
				}}
			>
				{startCase(kyc_status)}
			</div>

			{kyc_status === 'rejected' ? (
				<>
					<div
						className={styles.dis}
						style={{ color: '#ED3726' }}
					>
						Rejection reason -
						{' '}
						<b>{kyc_rejection_reason}</b>
					</div>

					<div>
						Feedbacks -
						{'  '}
						{(kyc_rejection_feedbacks || []).map((reason, index) => (
							<span>
								<b>
									{' '}
									{startCase(reason)}
								</b>
								{index !== kyc_rejection_feedbacks.length - 1 ? ',' : null}
								{'  '}
							</span>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}

export default Verified;
