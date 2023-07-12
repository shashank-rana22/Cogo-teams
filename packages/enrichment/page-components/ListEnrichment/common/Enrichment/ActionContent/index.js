import {
	IcMCross,
	IcMEdit,
	IcMPlusInCircle,
	IcMTick,
} from '@cogoport/icons-react';

import getActionConfigurations from '../../../configurations/get-action-configuration';

import styles from './styles.module.css';

const ICON_MAPPING = {
	edit    : IcMEdit,
	add     : IcMPlusInCircle,
	success : IcMTick,
	failed  : IcMCross,
};

const COUNT = 1;

function ActionContent({ onClickCta = () => {}, activeTab = '' }) {
	const CTA_MAPPING = getActionConfigurations({ activeTab });

	return (
		<div className={styles.action_container}>

			{Object.keys(CTA_MAPPING || {}).map((key, index) => {
				const Icon = ICON_MAPPING[key];

				const numberOfActions = Object.keys(CTA_MAPPING || {}).length;

				return (
					<div
						key={key}
						className={index + COUNT === numberOfActions
							? styles.workflow_cta_last : styles.workflow_cta}
						role="presentation"
						onClick={() => onClickCta(key)}
					>
						<div className={styles.cta_text}>

							<Icon width={16} height={16} style={{ marginRight: '10px' }} />

							{CTA_MAPPING[key]}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ActionContent;
