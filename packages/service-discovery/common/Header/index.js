import { useSelector } from '@cogoport/store';
import React from 'react';

import AdditionalServicesForm from '../../page-components/SearchResults/components/AdditionalServices/AdditionalServicesForm';
import EditDetailsHeader from '../../page-components/SearchResults/components/EditDetailsHeader';

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
	...rest
}) {
	const { platformTheme } = useSelector(({ profile }) => profile);

	const { scrollDirection } = useScrollDirection();

	const styledTheme = {
		container      : `${styles.container} ${styles[platformTheme]}`,
		header_wrapper : `${styles.header_wrapper}${styles[platformTheme]}`,
		back_button    : `${styles.back_button} ${styles[platformTheme]} `,
		details_header : `${styles.details_header} ${styles[platformTheme]} `,
	};

	const SubHeaderComponent = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key] || null;
	const isAllowedToEdit = rest.activePage === 'search_results';

	return (
		<div className={`${styledTheme.container} ${showAdditionalHeader ? styles.show : {}}`}>
			<div className={styledTheme.header_wrapper}>
				{scrollDirection === 'up' ? (
					<Back heading={rest.headerHeading} {...rest} />
				) : null}

				<div className={styledTheme.details_header}>
					<div className={styles.search_details}>
						<SearchDetails
							data={data}
							service_key={service_key}
							loading={loading}
							setHeaderProps={setHeaderProps}
							platformTheme={platformTheme}
							showAdditionalHeader={showAdditionalHeader}
							isAllowedToEdit={isAllowedToEdit}
							activePage={rest.activePage}
						/>
					</div>

					<div className={styles.sub_wrapper}>
						<LoadOverview
							data={data}
							service_key={service_key}
							loading={loading}
							activePage={rest.activePage}
							isEditable={isAllowedToEdit}
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
