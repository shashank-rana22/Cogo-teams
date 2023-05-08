import { cl } from '@cogoport/components';
import { IcMFfcl, IcMFlocalCharges, IcMFcustoms, IcMFlcl, IcCFlclCustoms, IcMAir } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import styles from './styles.module.css';

const HEIGHT = 28;
const WIDTH = 28;

const iconMapping = {
	fcl_freight : { icon: IcMFfcl, fill: '#ee3425', text: 'FCL' },
	fcl_customs : { icon: IcMFcustoms, fill: '#ee3425', text: 'FCL Customs' },
	fcl_local   : { icon: IcMFlocalCharges, fill: '#ee3425', text: 'FCL Local' },
	lcl_freight : { icon: IcMFlcl, fill: '#ee3425', text: 'LCL' },
	lcl_customs : { icon: IcCFlclCustoms, fill: '#ee3425', text: 'LCL Customs' },
	air_freight : { icon: IcMAir, fill: '#ee3425', text: 'Air Freight' },
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

			<div className={cl` ${styles.icon_text} customize_icon_text`} style={{ color: currentIcon?.fill }}>
				{icon_text || currentIcon.text || '' }
			</div>
		</div>
	);
}
export default ShipmentIcon;
