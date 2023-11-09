import { isEmpty } from '@cogoport/utils';

import SearchDetails from '../common/SearchDetails';
import Wallet from '../common/Wallet';

// import Load from './Load';
import styles from './styles.module.css';

function LTLHeader({
	data = {},
	showAdditionalHeader = false,
	setHeaderProps = () => {},
	service_key = 'search_type',
	loading = false,
	activePage = '',
	// infoBanner = {},
	// setInfoBanner = () => {},
	setRouterLoading = () => {},
	// isGuideViewed = false,
}) {
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
				/>
			</div>

			<div className={styles.right_section}>
				{/* <Load
					data={data}
					loading={loading && isEmpty(data)}
					activePage={activePage}
					isAllowedToEdit={isAllowedToEdit}
					// infoBanner={infoBanner}
					// setInfoBanner={setInfoBanner}
					// isGuideViewed={isGuideViewed}
					setRouterLoading={setRouterLoading}
				/> */}

				<Wallet
					data={data}
					service_key={service_key}
				/>
			</div>
		</div>
	);
}

export default LTLHeader;
