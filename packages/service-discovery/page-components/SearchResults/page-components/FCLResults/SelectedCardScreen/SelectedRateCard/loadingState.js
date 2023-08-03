import { Placeholder } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const BUNDLES_LOADING_COUNT = 2;
const SERVICES_LOADING_COUNT = 6;

function LoadingState() {
	return (
		<div className={styles.loading_container}>
			<Placeholder
				height="160px"
				width="100%"
				margin="0 0 30px 0"
				style={{ borderRadius: '8px' }}
			/>

			<div className={styles.services}>
				<div className={styles.service_bundling}>
					<div className={styles.loading_heading}>Pre-curated Offers</div>

					{[...Array(BUNDLES_LOADING_COUNT)].map((_) => (
						<Placeholder
							key={_}
							height="200px"
							width="96%"
							style={{ borderRadius: '8px' }}
							margin="0px 0px 20px 0px"
						/>
					))}
				</div>

				<div className={styles.additional_services}>
					<div className={styles.loading_heading}>You may need these services</div>

					{[...Array(SERVICES_LOADING_COUNT).keys()].map((item) => (
						<div key={item} className={styles.loading_service_item}>
							<Placeholder
								height="50%"
								width="25%"
								margin="0px 0px 0px 40px"
							/>

							<IcMPlus
								height={22}
								width={22}
								className={styles.add_icon}
								fill="black"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
