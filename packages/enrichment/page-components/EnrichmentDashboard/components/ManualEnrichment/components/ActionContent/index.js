import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import {
	IcMCross,
	IcMEdit,
	IcMEyeopen,
	IcMPlusInCircle,
	IcMTick,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const ICONS_MAPPING = {
	edit    : IcMEdit,
	add     : IcMPlusInCircle,
	success : IcMTick,
	failed  : IcMCross,
	view    : IcMEyeopen,
};

function ActionContent({ onClickCta = () => {}, secondaryTab = '', loadingComplete = false }) {
	const geo = getGeoConstants();

	const ACTIONS_MAPPING = geo.navigations.enrichment.manual_enrichment.actions;

	const actions = ACTIONS_MAPPING[secondaryTab];

	return (
		<div className={styles.action_container}>

			{Object.keys(actions || {}).map((key) => {
				const Icon = key ? ICONS_MAPPING[key] : null;

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

						<div>{actions[key]}</div>

					</Button>

				);
			})}
		</div>
	);
}

export default ActionContent;
