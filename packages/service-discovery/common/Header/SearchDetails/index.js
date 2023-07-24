import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import LocationDetails from '../../LocationDetails';
import SelectedOrgInfo from '../../SelectedOrgInfo';

import styles from './styles.module.css';

function SearchDetails({
	data = {},
	setHeaderProps = () => {},
	service_key = 'search_type',
	platformTheme = 'light',
	showAdditionalHeader = false,
	loading = false,
	isAllowedToEdit = true,
	...rest
}) {
	const { importer_exporter = {}, user = {} } = data || {};
	const { business_name = '' } = importer_exporter || {};
	const { name: user_name = '' } = user || {};

	const handleEdit = (event) => {
		event.stopPropagation();
		setHeaderProps({ key: 'edit_details', data, setShow: setHeaderProps });
	};

	return (
		<div className={styles.container}>
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
	);
}

export default SearchDetails;
