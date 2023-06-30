import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMEdit, IcMFilter, IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import LocationDetails from '../../../../common/LocationDetails';

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

	const { importer_exporter = {}, user = {} } = data || {};

	const { business_name = '' } = importer_exporter || {};

	const { name: user_name = '' } = user || {};

	const handleEdit = () => {
		setHeaderProps({ key: 'edit_details', data, setShow: setShowAdditionalHeader });
		setShowAdditionalHeader((prev) => !prev);
	};

	const handleBack = () => {
		// router.push(
		// 	'/service_discovery',
		// 	'/service_discovery',
		// );
		router.back();
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_wrapper}>
				<div className={styles.back_button}>

					<IcMArrowBack height={20} width={20} style={{ cursor: 'pointer' }} onClick={handleBack} />
					<span>Back</span>
				</div>

				<div className={styles.details_header}>
					<div className={styles.org_details}>
						<SelectedOrgInfo
							org_name={business_name}
							user_name={user_name}
							setShow={setShowAdditionalHeader}
							show={showAdditionalHeader}
						/>
					</div>

					<div className={styles.location_details}>
						<LocationDetails data={data} />
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
