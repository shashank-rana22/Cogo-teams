import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ICON_MAPPING = {
	CogoLite      : GLOBAL_CONSTANTS.image_url.cogo_lite,
	CogoAnchor    : GLOBAL_CONSTANTS.image_url.cogo_anchor,
	CogoCaptain   : GLOBAL_CONSTANTS.image_url.cogo_captain,
	CogoFreighter : GLOBAL_CONSTANTS.image_url.cogo_freighter,
	default       : GLOBAL_CONSTANTS.image_url.cogo_lite,
};

const NAME_MAPPING = {
	cogolite      : 'CogoLite',
	cogoanchor    : 'CogoAnchor',
	cogocaptain   : 'CogoCaptain',
	cogofreighter : 'CogoFreighter',
	default       : 'CogoLite',
};

function SubscriptionDiscounts({
	saasPlansData = {},
	selectedService = '',
}) {
	const basePlans = (saasPlansData?.list || []).filter(
		(elem) => elem.category === 'base',
	);

	return (
		<div className={styles.slabs_container}>
			<div style={{ flex: 1, fontSize: '10px', color: '#393f70' }}>
				**Provided margins will be applied to the Channel Partners with
				CogoLite subscription only, for Channel Partners with other
				subscription plans additional discounts will be added on top of that
			</div>
			<div style={{
				flex           : 2,
				flexDirection  : 'row',
				display        : 'flex',
				justifyContent : 'space-around',
			}}
			>
				{(basePlans || []).map((item) => {
					const newName = NAME_MAPPING?.[item?.plan_name];

					const { promotion_discounts = [] } = item || {};

					const info = (promotion_discounts || []).find(
						(service) => service?.service_name === selectedService,
					);

					const { unit = '', value = 0 } = info || {};

					return (
						<div key={item} className={styles.slab}>
							<div className={styles.small_title}>
								<Image
									src={
											ICON_MAPPING[newName]
											|| GLOBAL_CONSTANTS.image_url.cogo_lite
										}
									width={25}
									height={25}
									alt=""
								/>
								{newName || startCase(item?.plan_name)}
							</div>
							{value === 0 ? (
								<div className={styles.small_title_value}>--</div>
							) : (
								<div className={styles.small_title_value}>
									{unit === 'percentage'
										? `${Number(value)}% off`
										: `Flat ${Number(value)} off`}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SubscriptionDiscounts;
