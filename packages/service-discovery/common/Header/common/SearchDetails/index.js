import { cl } from '@cogoport/components';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';

import LocationDetails from '../../../LocationDetails';
import SelectedOrgInfo from '../../../SelectedOrgInfo';

import styles from './styles.module.css';

function SearchDetails({
	data = {},
	setHeaderProps = () => {},
	service_key = 'search_type',
	showAdditionalHeader = false,
	loading = false,
	isAllowedToEdit = true,
	activePage = '',
	currentScreen = '',
	setCurrentScreen = () => {},
	setRouterLoading = () => {},
	...rest
}) {
	const { importer_exporter = {}, user = {} } = data || {};
	const { business_name = '' } = importer_exporter || {};
	const { name: user_name = '' } = user || {};

	const handleEdit = (event) => {
		event.stopPropagation();
		setHeaderProps({ key: 'edit_details', data, setShow: setHeaderProps, setRouterLoading });
	};

	return (
		<div className={cl`${styles.container} ${rest.className}`}>
			<SelectedOrgInfo
				{...rest}
				orgName={business_name}
				userName={user_name}
				loading={loading}
				activePage={activePage}
				currentScreen={currentScreen}
				setCurrentScreen={setCurrentScreen}
			/>

			<LocationDetails
				service_key={service_key}
				data={data}
				loading={loading}
				activePage={activePage}
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
