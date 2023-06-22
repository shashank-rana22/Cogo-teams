import {
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

function Entity({ entityCode }) {
	const ICON_MAPPING = {
		101 : <IcCCountryIndia height={20} width={20} />,
		201 : <IcCCountryNetherland height={20} width={20} />,
		301 : <IcCCountryIndia height={20} width={20} />,
		401 : <IcCCountrySingapore height={20} width={20} />,
		501 : <IcCCountryVietnam height={20} width={20} />,
	};

	return (
		<div className={styles.container}>
			{ICON_MAPPING[entityCode]}
			<div className={styles.text}>
				Entity
				{entityCode}
			</div>
		</div>
	);
}
export default Entity;
