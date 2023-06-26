import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMEdit, IcMFilter } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

import LocationDetails from './LocationDetails';
import SelectedOrgInfo from './SelectedOrgInfo';
import styles from './styles.module.css';

function Header({ data = {}, showAdditionalHeader, setShowAdditionalHeader, setHeaderProps, setShowFilterModal }) {
	const router = useRouter();

	const {
		importer_exporter = {},
		user = {},
	} = data || {};

	const { business_name = '' } = importer_exporter || {};

	const { name = '' } = user || {};

	const handleEdit = () => {
		setHeaderProps({ key: 'edit_details', data });
		setShowAdditionalHeader((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_wrapper}>
				<div className={styles.back_button}>
					<IcMArrowBack height={20} width={20} style={{ cursor: 'pointer' }} onClick={() => router.back()} />
					<span>Back to Discover Rates</span>
				</div>

				<div className={styles.details_header}>
					<div className={styles.org_details}>
						<SelectedOrgInfo
							org_name={business_name}
							user_name={name}
							setShow={setShowAdditionalHeader}
							show={showAdditionalHeader}
						/>
					</div>

					<div className={styles.location_details}>
						<LocationDetails data={data} />
					</div>

					<div className={styles.edit_details}>
						<IcMEdit height={16} width={16} onClick={handleEdit} />
					</div>

					<Button size="lg" themeType="link" onClick={() => setShowFilterModal(true)}>
						<IcMFilter />
						Filters
					</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
