import { Placeholder, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const BUNDLES_LOADING_COUNT = 2;
const SERVICES_LOADING_COUNT = 6;

const SERVICES_NOT_TO_SHOW_BUNDLES = ['ftl_freight'];

function LoadingState({ isMobile = false, service = '' }) {
	const showBundles = !SERVICES_NOT_TO_SHOW_BUNDLES.includes(service);

	return (
		<div className={styles.container}>
			<Placeholder
				height="160px"
				width="100%"
				margin="60px 0 30px 0"
				style={{ borderRadius: '8px' }}
			/>

			<div className={styles.loading_flex}>
				{showBundles ? (
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
				) : null}

				<div className={cl`${styles.additional_services} ${!showBundles && styles.full_width}`}>
					<div className={styles.loading_heading}>You may need these services</div>

					{[...Array(SERVICES_LOADING_COUNT).keys()].map((item) => (
						<div key={item} className={styles.loading_service_item}>
							<Placeholder
								height={isMobile ? '40%' : '50%'}
								width={isMobile ? '50%' : '25%'}
								margin={isMobile ? '0px 0px 0px 24px' : '0px 0px 0px 40px'}
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
