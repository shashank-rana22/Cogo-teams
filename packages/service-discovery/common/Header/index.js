import { IcMArrowBack, IcMEdit, IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import AdditionalServicesForm from '../../page-components/SearchResults/components/AdditionalServices/AdditionalServicesForm';
import ToggleSwitch from '../../page-components/SearchResults/components/DarkLightMode';
import EditDetailsHeader from '../../page-components/SearchResults/components/EditDetailsHeader';
import LocationDetails from '../LocationDetails';

import SelectedOrgInfo from './SelectedOrgInfo';
import styles from './styles.module.css';

const SUB_HEADER_COMPONENT_MAPPING = {
	edit_details                : EditDetailsHeader,
	additional_services_details : AdditionalServicesForm,
	default                     : null,
};

const backScreen = (currentScreen) => {
	const MAPPING = {
		listRateCard : 'back',
		selectedCard : 'listRateCard',
		comparison   : 'selectedCard',
		bookCheckout : 'selectedCard',
	};
	return MAPPING[currentScreen] || 'back';
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

	const router = useRouter();

	const { importer_exporter = {}, user = {} } = data || {};
	const { business_name = '' } = importer_exporter || {};
	const { name: user_name = '' } = user || {};

	const handleEdit = () => {
		setHeaderProps({ key: 'edit_details', data, setShow: setHeaderProps });
	};

	const styledTheme = {
		container      : `${styles.container} ${styles[platformTheme]}`,
		header_wrapper : `${styles.header_wrapper}${styles[platformTheme]}`,
		back_button    : `${styles.back_button} ${styles[platformTheme]} `,
		details_header : `${styles.details_header} ${styles[platformTheme]} `,
	};

	const SubHeaderComponent = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key] || null;

	const isAllowedToEdit = rest.activePage === 'search_results';

	const onBack = () => {
		const { currentScreen = '', setCurrentScreen = () => {} } = rest;
		const backscreen = backScreen(currentScreen);

		if (backscreen !== 'back') {
			setCurrentScreen(() => backscreen);
		} else {
			router.back();
		}
	};

	return (
		<div
			className={`${styledTheme.container} ${showAdditionalHeader ? styles.show : {}}`}
			style={{ boxShadow: showAdditionalHeader ? 'none' : '0px 8px 8px 0 #EBEBF0' }}
		>
			<div className={styledTheme.header_wrapper}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div className={styledTheme.back_button}>

						<IcMArrowBack
							height={20}
							width={20}
							style={{ cursor: 'pointer' }}
							onClick={onBack}
						/>
						<span>{rest.headerHeading || 'Back'}</span>
					</div>

					<div style={{ marginRight: 8 }}>
						<ToggleSwitch />
					</div>
				</div>

				<div className={styledTheme.details_header}>
					<SelectedOrgInfo
						{...rest}
						orgName={business_name}
						userName={user_name}
						platformTheme={platformTheme}
						loading={loading}
					/>

					<LocationDetails
						{...rest}
						service_key={service_key}
						data={data}
						platformTheme={platformTheme}
						loading={loading}
					/>

					{isAllowedToEdit ? (
						<div className={styles.edit_details}>
							{showAdditionalHeader ? (
								<IcMCross height={16} width={16} onClick={() => setHeaderProps({})} />
							) : (
								<IcMEdit height={16} width={16} onClick={handleEdit} />
							)}

						</div>
					) : null}

				</div>
			</div>

			{showAdditionalHeader ? (
				<div className={styles.additional_header}>
					<SubHeaderComponent {...headerProps} />
				</div>
			) : null}

			{/* {headerProps.key === 'additional_services_details' ? <SubHeaderComponent {...headerProps} /> : null} */}

		</div>

	);
}

export default Header;
