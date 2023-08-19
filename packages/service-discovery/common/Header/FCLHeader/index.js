import { isEmpty } from '@cogoport/utils';

import Back from '../common/Back';
import SearchDetails from '../common/SearchDetails';
import Wallet from '../common/Wallet';

import ContainerDetails from './ContainerDetails';
import styles from './styles.module.css';

function FCLHeader({
	data = {},
	showAdditionalHeader = false,
	setHeaderProps = () => {},
	service_key = 'search_type',
	loading = false,
	activePage = '',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	...rest
}) {
	const isAllowedToEdit = activePage === 'search_results';

	if (isEmpty(data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			{activePage !== 'checkout' ? (
				<Back
					currentScreen={rest.currentScreen}
					heading={rest.headerHeading}
				/>
			) : null}

			<div className={styles.details_header}>
				<div className={styles.left_section}>
					<SearchDetails
						data={data}
						service_key={service_key}
						loading={loading && isEmpty(data)}
						setHeaderProps={setHeaderProps}
						showAdditionalHeader={showAdditionalHeader}
						isAllowedToEdit={isAllowedToEdit}
						activePage={activePage}
					/>
				</div>

				<div className={styles.right_section}>
					<ContainerDetails
						data={data}
						loading={loading && isEmpty(data)}
						activePage={rest.activePage}
						isAllowedToEdit={isAllowedToEdit}
						infoBanner={infoBanner}
						setInfoBanner={setInfoBanner}
						isGuideViewed={isGuideViewed}
					/>

					<Wallet
						data={data}
						service_key={service_key}
					/>
				</div>
			</div>
		</div>
	);
}

export default FCLHeader;
