import { Button, Modal } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ModalBody from './ModalBody';
import useGetIngestionStats from './useGetIngestionStats';

const getUserValueProps = (recently_created_user = {}) => {
	const {
		name = '',
		serial_id = '',
		mobile_number = '',
		mobile_country_code = '',
		email = '',
		alternate_email = '',
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
	} = recently_created_organization || {};

	const valueProps = Object.fromEntries(
		Object.entries({
			serial_id,	account_type: startCase(account_type), business_name, country, registration_number,
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
		>
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					Current Status
					<div
						role="presentation"
						onClick={() => refetchCurrentStatus()}
						style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
					>
						<IcMRefresh style={{ marginLeft: '4px' }} />

					</div>
				</div>
			)}
			/>

			<Modal.Body>
				<ModalBody apiErrors={apiErrors} loading={loading} data={data} mapArray={mapArray} />
			</Modal.Body>

			<Modal.Footer>
				<Button style={{ margin: '0 8px 0 0' }} themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default CurrentStatus;
