import { cl } from '@cogoport/components';
import {
	IcMFftl,
	IcMFltl,
	IcCFhaulage,
	IcMFtrailorFull,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const HEIGHT = 28;
const WIDTH = 28;

const iconMapping = {
	ftl_freight           : { icon: IcMFftl, fill: '#ee3425', text: 'FTL' },
	ltl_freight           : { icon: IcMFltl, fill: '#ee3425', text: 'LTL' },
	rail_domestic_freight : { icon: IcCFhaulage, fill: '#ee3425', text: 'RAIL' },
	haulage_freight       : { icon: IcCFhaulage, fill: '#ee3425', text: 'HAULAGE' },
	trailer_freight       : { icon: IcMFtrailorFull, fill: '#ee3425', text: 'TRAILER' },
};

function ShipmentIcon({ shipment_type = '', icon_text = '' }) {
	const currentIcon = iconMapping[shipment_type];

	const Icon = currentIcon?.icon;

	if (isEmpty(currentIcon)) return null;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.icon_container} customize_icon`}>
				<Icon height={HEIGHT} width={WIDTH} fill={currentIcon?.fill || ''} />
			</div>

			<div
				className={cl` ${styles.icon_text} customize_icon_text`}
				style={{ color: currentIcon?.fill }}
			>
				{icon_text || currentIcon?.text || ''}
			</div>
		</div>
	);
}
export default ShipmentIcon;
