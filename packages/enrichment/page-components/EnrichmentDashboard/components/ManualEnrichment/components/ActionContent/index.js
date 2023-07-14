import { Button } from '@cogoport/components';
import {
	IcMCross,
	IcMEdit,
	IcMPlusInCircle,
	IcMTick,
} from '@cogoport/icons-react';

import { getActionConfigurations } from '../../../../utils/secondary-tabs-mapping';

import styles from './styles.module.css';

const ICON_MAPPING = {
	edit    : IcMEdit,
	add     : IcMPlusInCircle,
	success : IcMTick,
	failed  : IcMCross,
};

function ActionContent({ onClickCta = () => {}, secondaryTab = '', loadingComplete = false }) {
	const CTA_MAPPING = getActionConfigurations({ secondaryTab });

	return (
		<div className={styles.action_container}>

			{Object.keys(CTA_MAPPING || {}).map((key) => {
				const Icon = ICON_MAPPING[key];

				return (
					<Button
						key={key}
						type="button"
						themeType="tertiary"
						className={styles.cta_text}
						disabled={loadingComplete}
						onClick={() => onClickCta(key)}
					>

						<Icon width={16} height={16} style={{ marginRight: '10px' }} />

						<div>{CTA_MAPPING[key]}</div>

					</Button>

				);
			})}
		</div>
	);
}

export default ActionContent;
