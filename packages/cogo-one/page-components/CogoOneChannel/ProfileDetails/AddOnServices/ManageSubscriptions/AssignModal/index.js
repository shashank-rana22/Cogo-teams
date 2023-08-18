import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateSubscriptionInvoice from '../../../../../../hooks/useCreateSubscriptionInvoice';
import useGetBillingAdressess from '../../../../../../hooks/useGetBillingAdresses';
import useGetOrganizationAddresses from '../../../../../../hooks/useGetOrganizationAddresses';

import AddAddressModal from './AddAddressModal';
import AddressCard from './AddressCard';
import styles from './styles.module.css';

function AssignModal({
	isAssignModal = false,
	setIsAssignModal = () => {},
	orgId = '',
	checkoutId = '',
	getUserActivePlans = () => {},
}) {
	const [selectedAddress, setSelectedAddress] = useState({});
	const [isAddressModal, setIsAddressModal] = useState(false);

	const {
		getOrgBillingAddresses = () => {},
		billingAddressesLoading = false,
		billingAddressesData = [],
	} = useGetBillingAdressess({ orgId });

	const {
		getOrganizationAddresses = () => {},
		addressesLoading = false,
		orgAddressesData = [],
	} = useGetOrganizationAddresses({ orgId });

	const billingAddresses = billingAddressesData?.concat(orgAddressesData);
	const addressLoading = billingAddressesLoading || addressesLoading;

	const {
		createSubscriptionInvoice = () => {},
		loading = false,
	} = useCreateSubscriptionInvoice({ selectedAddress, checkoutId, setIsAssignModal, getUserActivePlans });

	useEffect(() => {
		getOrgBillingAddresses();
		getOrganizationAddresses();
	}, [getOrgBillingAddresses, getOrganizationAddresses]);

	return (
		<>
			<Modal
				show={isAssignModal}
				size="md"
				closeOnOuterClick={false}
				onClose={() => setIsAssignModal(false)}
			>
				<Modal.Header title="Assign" />

				<Modal.Body className={styles.assign_modal_resolution}>
					<div className={styles.header}>
						<div>Billing Address</div>
						<Button
							themeType="secondary"
							size="md"
							onClick={() => setIsAddressModal(true)}
						>
							<IcMPlusInCircle width={15} height={15} className={styles.add_icon} />
							Add New
						</Button>
					</div>

					{isEmpty(billingAddresses) && !addressLoading ? (
						<div className={styles.empty_state_container}>
							<Image
								src={GLOBAL_CONSTANTS.image_url.nodata_image}
								width={300}
								height={300}
								alt="address unavailable"
							/>
							<div className={styles.note_for_address_unavailable}>
								There are no existing addresses available. Create a new an address.
							</div>
						</div>
					)
						: (
							<div className={styles.addresses_main_container}>
								<div className={styles.heading}>
									Select Address
								</div>
								<AddressCard
									addressLoading={addressLoading}
									billingAddresses={billingAddresses}
									selectedAddress={selectedAddress}
									setSelectedAddress={setSelectedAddress}
								/>
							</div>
						)}
				</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="secondary"
						size="md"
						className={styles.cancel_button}
						onClick={() => setIsAssignModal(false)}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button size="md" loading={loading} onClick={createSubscriptionInvoice}>Assign</Button>
				</Modal.Footer>
			</Modal>

			<AddAddressModal
				isAddressModal={isAddressModal}
				setIsAddressModal={setIsAddressModal}
				getOrganizationAddresses={getOrganizationAddresses}
				orgId={orgId}
				setSelectedAddress={setSelectedAddress}
			/>
		</>
	);
}

export default AssignModal;
