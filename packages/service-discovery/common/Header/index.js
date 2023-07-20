import { cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

// eslint-disable-next-line max-len
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
	activePage = '',
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
	const isAllowedToEdit = activePage === 'search_results';

	return (
		<div className={cl`${styledTheme.container} ${showAdditionalHeader ? styles.show : {}}`}>
			<div className={styledTheme.header_wrapper}>
				{scrollDirection === 'up' && activePage !== 'checkout' ? (
					<Back heading={rest.headerHeading} {...rest} />
				) : null}

				<div className={styledTheme.details_header}>
					<div className={styles.search_details}>
						<SearchDetails
							data={data}
							service_key={service_key}
							loading={loading && isEmpty(data)}
							setHeaderProps={setHeaderProps}
							platformTheme={platformTheme}
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
