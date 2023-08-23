import { Modal, Button, Input, Placeholder, cl } from '@cogoport/components';
import { IcMAppSearch } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListOrganizationUsers from '../../hooks/useListOrganizationUsers';
import useUpdateShipmentPrimaryPoc from '../../hooks/useUpdateShipmentPrimaryPoc';
import UserCard from '../UserCard';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function AddPrimaryPocModal({
	showPocModal = {},
	setShowPocModal = () => {},
	getShipmentsList = () => {},
	setActiveTab = () => {},
	fetchActivityLogs = () => {},
}) {
	const [selectedData, setSelectedData] = useState({});

	const { show: showModal = false, shipmentData = {} } = showPocModal || {};

	const { importer_exporter_id = '', primary_poc_details = {} } = shipmentData || {};
	const {
		formattedOrgUsersList = [],
		loading = false,
		setSearch = () => {},
		search = '',
	} = useListOrganizationUsers({
		organizationId : importer_exporter_id,
		endPoint       : 'list_organization_users',
		filterKey      : 'organization_id',
	});
	const {
		updatePrimaryPoc = () => {},
		updateLoading = false,
	} = useUpdateShipmentPrimaryPoc({ setShowPocModal, getShipmentsList, setActiveTab, fetchActivityLogs });

	const modifiedList = loading ? [...Array(LOADER_COUNT).fill({})] : formattedOrgUsersList;

	const handleClose = () => {
		setShowPocModal({ show: false, shipmentData: {} });
		setSelectedData({});
	};

	useEffect(() => {
		setSelectedData(primary_poc_details);
	}, [primary_poc_details]);

	return (
		<Modal
			placement="center"
			size="sm"
			show={showModal}
			closeOnOuterClick={handleClose}
			onClose={handleClose}
			className={styles.styled_modal}
		>
			<Modal.Header title="Set Primary Poc" />

			<Modal.Body>
				<div className={styles.input_container}>
					<Input
						placeholder="search by name..."
						onChange={setSearch}
						value={search}
						className={styles.input_styles}
						size="sm"
						suffix={<IcMAppSearch className={styles.search_icon} />}
					/>
				</div>

				<div className={styles.list_container}>
					{!isEmpty(modifiedList) ? modifiedList?.map((eachUser) => {
						const {
							user_id,
							userName = '',
							email = '',
							countryCode = '',
							whatsapp_number_eformat = '',
							business_name = '',
							work_scopes = [],
						} = eachUser || {};

						const userData = {
							name         : userName,
							email,
							country_code : countryCode,
							user_number  : whatsapp_number_eformat,
							business_name,
							work_scopes,
						};

						if (loading) {
							return (
								<Placeholder
									key={user_id}
									className={styles.placeholder_styles}
								/>
							);
						}

						return (
							<div
								key={user_id}
								role="presentation"
								className={cl`${styles.each_container} 
								${(selectedData?.user_id || selectedData?.id)
								=== eachUser?.user_id ? styles.active_card : ''}`}
								onClick={() => setSelectedData(eachUser)}
							>
								<UserCard userData={userData} showDirection={false} showWorkScope />
							</div>
						);
					}) : <div className={styles.no_data_found}>No Users Found</div>}

				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					type="submit"
					onClick={() => {
						updatePrimaryPoc({ selectedData, showPocModal });
					}}
					loading={updateLoading}
					disabled={isEmpty(selectedData)}
				>
					Set Primary Poc
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddPrimaryPocModal;
