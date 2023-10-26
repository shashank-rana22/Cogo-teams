import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SearchDetails from '../common/SearchDetails';
import Wallet from '../common/Wallet';

import Load from './Load';
import styles from './styles.module.css';

function FTLHeader({
	data = {},
	showAdditionalHeader = false,
	setHeaderProps = () => {},
	service_key = 'search_type',
	loading = false,
	activePage = '',
	infoBanner = {},
	setInfoBanner = () => {},
	setRouterLoading = () => {},
	isGuideViewed = false,
	touch_points = {},
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const [show, setShow] = useState(false);

	const isAllowedToEdit = activePage === 'search_results';

	if (isEmpty(data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<SearchDetails
					data={data}
					service_key={service_key}
					loading={loading && isEmpty(data)}
					setHeaderProps={setHeaderProps}
					showAdditionalHeader={showAdditionalHeader}
					isAllowedToEdit={isAllowedToEdit}
					activePage={activePage}
					setRouterLoading={setRouterLoading}
					touch_points={touch_points}
					isMobile={isMobile}
					show={show}
					setShow={setShow}
				/>
			</div>

			{show || !isMobile ? (
				<div className={styles.right_section}>
					<Load
						data={data}
						loading={loading && isEmpty(data)}
						activePage={activePage}
						isAllowedToEdit={isAllowedToEdit}
						infoBanner={infoBanner}
						setInfoBanner={setInfoBanner}
						isGuideViewed={isGuideViewed}
						setRouterLoading={setRouterLoading}
						touch_points={touch_points}
						createLoading={createLoading}
						createSearch={createSearch}
						isMobile={isMobile}
					/>

					<Wallet
						data={data}
						service_key={service_key}
						isMobile={isMobile}
					/>
				</div>
			) : null}
		</div>
	);
}

export default FTLHeader;
