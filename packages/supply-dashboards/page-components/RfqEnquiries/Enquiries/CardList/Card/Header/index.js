import { Pill } from '@cogoport/components';
import { IcMFcl, IcMAir, IcMLcl, IcMLocalCharges } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getIncoTermMapping from '../../../../helpers/getIncoTermMapping';

import styles from './styles.module.css';

const SERVICE_MAPPING = {
	fcl_freight       : { icon: IcMFcl, label: 'FCL' },
	lcl_freight       : { icon: IcMLcl, label: 'LCL' },
	air_freight       : { icon: IcMAir, label: 'AIR' },
	fcl_freight_local : { icon: IcMLocalCharges, label: 'FCL Local' },
};

const getTradeType = (list) => {
	let tradeType = '';
	Object.keys(list).forEach((key) => {
		tradeType = list[key]?.trade_type || tradeType;
	});
	return tradeType;
};

function Header({ item }) {
	const service = item?.detail?.service_type;
	const rank = item?.negotiation_rank;
	const trade_type = item?.detail?.inco_term
		? startCase(getIncoTermMapping[item?.detail?.inco_term])
		: startCase(getTradeType(item?.detail?.service_details));
	const atActuals = item?.at_actuals;
	const Icon = SERVICE_MAPPING[service]?.icon;
	return (
		<div className={styles.heading}>
			<div className={styles.service}>
				<div className={styles.service_name}>
					<Icon width={30} height={30} style={{ padding: '4px' }} />
					{SERVICE_MAPPING[service]?.label}
				</div>
				<div>
					{rank ? (
						<Pill color="#4F4F4F">
							<div style={{ fontSize: '10px', color: '#ffffff' }}>
								Under Negotiation
								{' '}
								{rank}
							</div>
						</Pill>
					) : null}
				</div>
			</div>
			<div>
				{atActuals && <Pill color="#FDE74D">At Actuals</Pill>}
				<Pill color="blue">{trade_type}</Pill>
			</div>
		</div>

	);
}
export default Header;
