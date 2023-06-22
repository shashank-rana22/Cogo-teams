import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import OrganisationForm from '../../../ServiceDiscovery/SpotSearch/components/Header/OrganisationForm';

import LocationDetails from './LocationDetails';
import SelectedOrgInfo from './SelectedOrgInfo';
import styles from './styles.module.css';

function Header({ data = {} }) {
	const router = useRouter();

	const {
		importer_exporter = {},
		importer_exporter_id = '',
		importer_exporter_branch_id = '',
		user_id = '',
		user = {},
	} = data || {};

	const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
	const [organization, setOrganization] = useState({
		organization_id        : importer_exporter_id,
		organization_branch_id : importer_exporter_branch_id,
	});

	const { control, formState:{ errors }, watch, setValue } = useForm();

	const { business_name = '' } = importer_exporter || {};

	const { name = '' } = user || {};

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
				</div>
			</div>

			{showAdditionalHeader ? (
				<div className={`${styles.additional_header} ${showAdditionalHeader && styles.show}`}>
					<OrganisationForm
						organization={organization}
						setOrganization={setOrganization}
						control={control}
						errors={errors}
						watch={watch}
						setValue={setValue}
						style={{ margin: '40px 12px', maxWidth: '50%' }}
						organization_id={importer_exporter_id}
						user_id={user_id}
						disabled
					/>
				</div>
			) : null}

		</div>
	);
}

export default Header;
