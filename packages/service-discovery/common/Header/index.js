import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import EditDetailsHeader from '../../page-components/SearchResults/components/EditDetailsHeader';
import AdditionalServicesForm from '../OtherServices/AdditionalServices/AdditionalServicesForm';

import Back from './Back';
import LoadOverview from './LoadOverview';
import SearchDetails from './SearchDetails';
import styles from './styles.module.css';
import useScrollDirection from './useScrollDirection';
import Wallet from './Wallet';

const SUB_HEADER_COMPONENT_MAPPING = {
	edit_details                : EditDetailsHeader,
	additional_services_details : AdditionalServicesForm,
	default                     : {},
};

function Header({
	data = {},
	showAdditionalHeader = false,
	setHeaderProps = () => {},
	headerProps = {},
	service_key = 'search_type',
	loading = false,
	activePage = '',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	...rest
}) {
	// const { scrollDirection } = useScrollDirection();

	const headerRef = useRef(null);

	// const handleClickOutside = (event) => {
	// 	if (headerRef.current && !headerRef.current.contains(event.target)) {
	// 		setHeaderProps({});
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener('click', handleClickOutside);

	// 	return () => {
	// 		document.removeEventListener('click', handleClickOutside);
	// 	};
	// }, []);

	const SubHeaderComponent = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key] || null;
	const isAllowedToEdit = activePage === 'search_results';

	return (
		<div ref={headerRef} className={cl`${styles.container} ${showAdditionalHeader ? styles.show : {}}`}>
			<div className={styles.header_wrapper}>
				{activePage !== 'checkout' ? (
					<Back heading={rest.headerHeading} {...rest} />
				) : null}

				<div className={styles.details_header}>
					<div className={styles.search_details}>
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

					<div className={styles.sub_wrapper}>
						<LoadOverview
							data={data}
							service_key={service_key}
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

			{showAdditionalHeader ? (
				<div className={styles.additional_header}>
					<SubHeaderComponent {...headerProps} />
				</div>
			) : null}

		</div>

	);
}

export default Header;
