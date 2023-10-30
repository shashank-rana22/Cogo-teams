import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAirTracking, IcMOceanTracking } from '@cogoport/icons-react';
import Image from 'next/image';

import styles from './styles.module.css';

const LOADING_ROWS = 3;

const LOADING_ICON = {
	ocean : <IcMOceanTracking width={40} height={40} fill="#838383" />,
	air   : <IcMAirTracking width={40} height={40} fill="#838383" />,
};

function Loader({ type = 'ocean' }) {
	return (
		<div className={styles.container}>
			<div className={styles.milestone_loader}>
				{[...Array(LOADING_ROWS).keys()].map((ele) => (
					<div key={ele} className={styles.card}>
						<Placeholder height="35x" margin="0px 0px 20px 0px" />
						<Placeholder height="100px">
							{LOADING_ICON[type]}
						</Placeholder>
					</div>
				))}
			</div>
			<div className={styles.map_loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.map_loading}
					width={800}
					height={500}
					alt="loading"
				/>
			</div>
		</div>
	);
}

export default Loader;
