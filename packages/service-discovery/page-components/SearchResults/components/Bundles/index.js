import React from 'react';

import OfferBundle from './OfferBundle';
import styles from './styles.module.css';

const ARRAY = [
	{
		bg_color   : '#CED1ED',
		box_shadow : '0px 2px 4px 0px rgba(114, 120, 173, 0.60)',
		discount   : 60,
	},
	{
		bg_color   : '#F8AEA8',
		box_shadow : '0px 2px 4px 0px rgba(248, 174, 168, 0.70)',
		discount   : 80,
	},
];

function Bundles() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Pre-curated Offers (Coming Soon)</div>
			{ARRAY.map((item, index) => (
				<div key={item.bg_color} style={{ marginTop: index === 0 ? 0 : 20 }}>
					<OfferBundle data={item} />
				</div>
			))}

		</div>
	);
}

export default Bundles;
