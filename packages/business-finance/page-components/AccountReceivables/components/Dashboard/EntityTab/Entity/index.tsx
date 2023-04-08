import { IcCCountryNetherland, IcCCountrySingapore, IcCCountryIndia, IcCCountryVietnam } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	entityCode:string;
}
function Entity({ entityCode }:ItemProps) {
	const ICON_MAPPING = {
		101 : <IcCCountryIndia height={20} width={20} />,
		201 : <IcCCountryNetherland height={20} width={20} />,
		301 : <IcCCountryIndia height={20} width={20} />,
		401 : <IcCCountrySingapore height={20} width={20} />,
		501 : <IcCCountryVietnam height={20} width={20} />,
	};
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{entityCode === 'all' ? 'ALL'
					: (
						<>
							Entity
							{entityCode}
						</>
					)}
			</div>
			{ICON_MAPPING[entityCode]}
		</div>
	);
}

export default Entity;
