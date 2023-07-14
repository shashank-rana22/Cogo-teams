import { startCase } from '@cogoport/utils';

import getQuantity from '../../../../../utils/getQuantity';
import getService from '../../../../../utils/getService';

import styles from './styles.module.css';

const serviceMap = {
	fcl_freight : 'FCL',
	lcl_freight : 'LCL',
	air_freight : 'Air',
};

function ServiceDetail({ item, service, formattedData }) {
	const { contentToShow, unit } = getQuantity({ portPairdata: formattedData, service });
	const Element = getService({ portPair: { service_type: service } });

	return (
		<div className={styles.container}>
			<div className={styles.service}>
				<Element width={24} height={24} style={{ color: service === 'air_freight' ? '#221F20' : '#436DF4' }} />
				{startCase(serviceMap[service])}
			</div>
			<div className={styles.port_pair}>
				{(item[`${service}_services`] || []).length }
				{' '}
				{(item[`${service}_services`] || []).length > 1 ? 'Port Pairs' : 'Port Pair'}
			</div>
			<div className={styles.quantity}>
				{`${contentToShow} ${unit}`}
			</div>
			{
				item.source && (
					<div className={styles.quantity}>
						{item.source === 'spot_search' ? 'Spot search - lock freight' : startCase(item.source)}
					</div>
				)
			}

		</div>
	);
}

export default ServiceDetail;
