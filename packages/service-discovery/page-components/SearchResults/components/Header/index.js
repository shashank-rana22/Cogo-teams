import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMEdit, IcMFilter, IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import LocationDetails from '../../../../common/LocationDetails';
import ToggleSwitch from '../DarkLightMode';

import SelectedOrgInfo from './SelectedOrgInfo';
import styles from './styles.module.css';

function Header({
	data = {},
	showAdditionalHeader = false,
	setShowAdditionalHeader = () => {},
	setHeaderProps = () => {},
	setShowFilterModal = () => {},
}) {
	const router = useRouter();
	const { platformTheme } = useSelector(({ profile }) => profile);

	const { importer_exporter = {}, user = {} } = data || {};

	const { business_name = '' } = importer_exporter || {};

	const { name: user_name = '' } = user || {};

	const handleEdit = () => {
		setHeaderProps({ key: 'edit_details', data, setShow: setShowAdditionalHeader });
		setShowAdditionalHeader((prev) => !prev);
	};

	const styledTheme = {
		container         : `${styles.container} ${styles[platformTheme]}`,
		header_wrapper    : `${styles.header_wrapper}${styles[platformTheme]}`,
		back_button       : `${styles.back_button} ${styles[platformTheme]} `,
		details_header    : `${styles.details_header} ${styles[platformTheme]} `,
		org_details       : `${styles.org_details} ${styles[platformTheme]}`,
		location_details  : `${styles.location_details} ${styles[platformTheme]}`,
		additional_header : `${styles.additional_header} ${showAdditionalHeader
			&& styles.show} ${styles[platformTheme]} `,
	};

	return (
		<div className={styledTheme.container}>
			<div className={styledTheme.header_wrapper}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div className={styledTheme.back_button}>
						<IcMArrowBack
							height={20}
							width={20}
							style={{ cursor: 'pointer' }}
							onClick={() => router.back()}
						/>
						<span>Back to Discover Rates</span>
					</div>
					<div style={{ marginRight: 8 }}>
						<ToggleSwitch />
					</div>
				</div>

				<div className={styledTheme.details_header}>
					<div className={styledTheme.org_details}>
						<SelectedOrgInfo
							org_name={business_name}
							user_name={user_name}
							setShow={setShowAdditionalHeader}
							show={showAdditionalHeader}
							platformTheme={platformTheme}
						/>
					</div>

					<div className={styledTheme.location_details}>
						<LocationDetails data={data} platformTheme={platformTheme} />
					</div>

					<div className={styles.edit_details}>
						{showAdditionalHeader ? (
							<IcMCross height={16} width={16} onClick={() => setShowAdditionalHeader(false)} />
						) : (
							<IcMEdit height={16} width={16} onClick={handleEdit} />
						)}

					</div>

					<Button
						type="button"
						size="lg"
						themeType="link"
						onClick={() => setShowFilterModal(true)}
					>
						<IcMFilter />
						Filters
					</Button>
				</div>
			</div>

		</div>

	);
}

export default Header;
