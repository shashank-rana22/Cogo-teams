import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMRefresh } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ModalBody from './ModalBody';
import styles from './styles.module.css';
import useGetIngestionStats from './useGetIngestionStats';

const getUserValueProps = (recently_created_user = {}) => {
	const {
		name = '',
		serial_id = '',
		mobile_number = '',
		mobile_country_code = '',
		email = '',
		alternate_email = '',
		created_at,
	} = recently_created_user || {};

	const valueProps = Object.fromEntries(
		Object.entries({
			serial_id,
			name,
			mobile_number: mobile_number
				? `${mobile_country_code} ${mobile_number}`
				: null,
			email,
			alternate_email,
			created_at: formatDate({
				date       : created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
		}).filter(([, v]) => v),
	);

	return valueProps;
};

const getOrganizationValueProps = (recently_created_organization = {}) => {
	const {
		account_type = '',
		business_name = '',
		country = '',
		serial_id = '',
		registration_number = '',
		created_at,
	} = recently_created_organization || {};

	const valueProps = Object.fromEntries(
		Object.entries({
			serial_id,
			account_type : startCase(account_type),
			business_name,
			country,
			registration_number,
			created_at   : formatDate({
				date       : created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
		}).filter(([, v]) => v),
	);

	return valueProps;
};

function CurrentStatus(props) {
	const { tableModal = '', setTableModal = () => {}, row = {} } = props;

	const { data, loading, refetchCurrentStatus, apiErrors } = useGetIngestionStats({ row });

	const onClose = () => {
		setTableModal('');
	};

	const {
		users_count = 0,
		organizations_count = 0,
		recently_created_organization = {},
		recently_created_user = {},
	} = data || {};

	const userValueProps = getUserValueProps(recently_created_user);

	const organizationValueProps = getOrganizationValueProps(recently_created_organization);

	const mapArray = [
		{ count: users_count, valueProps: userValueProps, type: 'user' },
		{ count: organizations_count, valueProps: organizationValueProps, type: 'organization' },
	];

	return (
		<Modal
			key={tableModal}
			size="md"
			show={tableModal === 'current_status'}
			placement="center"
			scroll={false}
			onClose={onClose}
			className={styles.modal_container}
		>
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					Current Status
					<div
						role="presentation"
						onClick={() => refetchCurrentStatus()}
						className={styles.refresh_container}
					>
						Refresh
						<IcMRefresh style={{ marginLeft: '4px' }} />
					</div>
				</div>
			)}
			/>

			<Modal.Body>
				<ModalBody apiErrors={apiErrors} loading={loading} data={data} mapArray={mapArray} />
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default CurrentStatus;
