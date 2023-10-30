import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAirTracking, IcMOceanTracking, IcMAppEndTracking } from '@cogoport/icons-react';
import Image from 'next/image';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARR = [1, 2, 3];

const LOADING_ICON = {
	ocean   : IcMOceanTracking,
	air     : IcMAirTracking,
	surface : IcMAppEndTracking,
};

function Loader({ type = 'ocean' }) {
	const LoadingIcon = LOADING_ICON[type] || <div />;
	return (
		<div className={styles.container}>
			<div className={styles.milestone_loader}>
				{LOADING_ARR.map((ele) => (
					<div key={ele} className={styles.card}>
						<Placeholder height="35x" margin="0px 0px 20px 0px" />
						<Placeholder height="100px">
							<LoadingIcon width={40} height={40} fill="#838383" />
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

export default React.memo(Loader);
