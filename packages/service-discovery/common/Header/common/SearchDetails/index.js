import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMCross, IcMEdit } from '@cogoport/icons-react';

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
	touch_points = {},
	isMobile = false,
	show = false,
	setShow = () => {},
	...rest
}) {
	const { importer_exporter = {}, user = {} } = data || {};
	const { business_name = '' } = importer_exporter || {};
	const { name: user_name = '' } = user || {};

	const handleEdit = (event) => {
		event.stopPropagation();
		setHeaderProps({ key: 'edit_details', data, setShow: setHeaderProps, setRouterLoading, touch_points });
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
				touch_points={touch_points}
			/>

			<div className={styles.icons_container}>
				{isAllowedToEdit ? (
					<div className={styles.edit_details}>
						{showAdditionalHeader ? (
							<IcMCross
								height={16}
								width={16}
								onClick={() => setHeaderProps({})}
							/>
						) : (
							<IcMEdit height={16} width={16} onClick={handleEdit} />
						)}
					</div>
				) : null}

				{isMobile ? (
					<IcMArrowDown
						className={cl`${styles.down_arrow} ${show && styles.show}`}
						onClick={() => setShow(!show)}
					/>
				) : null}
			</div>
		</div>
	);
}

export default SearchDetails;
