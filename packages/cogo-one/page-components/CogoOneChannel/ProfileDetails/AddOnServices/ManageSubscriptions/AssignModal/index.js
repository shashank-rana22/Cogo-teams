import { Modal, Button, Radio, cl, Placeholder } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateSubscriptionInvoice from '../../../../../../hooks/useCreateSubscriptionInvoice';
import useGetBillingAdresses from '../../../../../../hooks/useGetBillingAdresses';
import useGetOrganizationAddresses from '../../../../../../hooks/useGetOrganizationAddresses';

import AddAddressModal from './AddAddressModal';
import styles from './styles.module.css';

const ADDRESS_PLACEHOLDER_COUNT = 3;
const ADDRESS_PLACEHODER = [...Array(ADDRESS_PLACEHOLDER_COUNT).keys()];

const renderName = ({ pocDetail = [] }) => {
	if (
		isEmpty(pocDetail)
		|| !pocDetail[GLOBAL_CONSTANTS.zeroth_index]?.name
	) {
		return '';
	}

	return ` (${pocDetail[GLOBAL_CONSTANTS.zeroth_index]?.name})`;
};

function AssignModal({
	showAssign = false,
	setShowAssign = () => {},
	orgId = '',
	selectedPlan = {},
	getUserActivePlans = () => {},
}) {
	const { checkout = {} } = selectedPlan || {};
	const { id: checkoutId = '' } = checkout || {};

	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const [selectedAddress, setSelectedAddress] = useState({});
	const [addAddressModal, setAddAddressModal] = useState(false);

	const {
		getOrgBillingAddresses = () => {},
		billingAddressesLoading = false,
		billingAddressesData = [],
	} = useGetBillingAdresses({ orgId });

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
	} = useCreateSubscriptionInvoice({ selectedAddress, checkoutId, setShowAssign, getUserActivePlans });

	useEffect(() => {
		getOrgBillingAddresses();
		getOrganizationAddresses();
	}, [getOrgBillingAddresses, getOrganizationAddresses]);

	return (
		<>
			<Modal
				show={showAssign}
				size="md"
				closeOnOuterClick={false}
				onClose={() => setShowAssign(false)}
			>
				<Modal.Header title="Assign" />

				<Modal.Body className={styles.assign_modal_resolution}>
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
					) : null}

					<div className={styles.header}>
						<div>Billing Address</div>
						<Button
							themeType="secondary"
							size="md"
							onClick={() => setAddAddressModal(true)}
						>
							<IcMPlusInCircle width={15} height={15} className={styles.add_icon} />
							Add New
						</Button>
					</div>

					<div className={styles.addresses_main_container}>
						<div className={styles.heading}>
							Select Address
						</div>
						{addressLoading ? (
							(ADDRESS_PLACEHODER.map((item) => (
								<div className={styles.card_row} key={item}>
									<Placeholder type="circle" radius="50px" margin="0px 0px 20px 0px" />
									<Placeholder
										height="90px"
										width="80%"
										margin="0px 0px 20px 8px"
										className={styles.square_shape_placeholder}
									/>
								</div>
							)))
						) : (
							<div className={styles.scroll_content}>
								{(billingAddresses || []).map((item) => {
									const {
										id = '',
										name = '',
										address = '',
										pincode = '',
										tax_number = '',
										address_type : addressType = '',
										organization_pocs = [],
									} = item || {};

									const isChecked = selectedAddress?.id === id;

									return (
										<div className={styles.address_card} key={id}>
											<div className={styles.radio_container}>
												<Radio
													checked={isChecked}
													onChange={() => {
														setSelectedAddress(item);
													}}
												/>
											</div>
											<div
												role="presentation"
												className={cl`${styles.card} ${isChecked ? styles.is_active_card : ''}`}
												onClick={() => {
													setSelectedAddress(item);
												}}
											>
												{addressType && (
													<div className={styles.address_type}>
														{addressType}
													</div>
												)}
												<div className={cl`${styles.card_row} ${styles.name}`}>
													{name}
													{renderName({ pocDetail: organization_pocs })}
												</div>
												<div className={cl`${styles.card_row}
											 ${styles.address_and_tax_number}`}
												>
													{address}
													,
													{pincode}
												</div>
												{tax_number ? (
													<div className={cl`${styles.card_row}
												${styles.address_and_tax_number}`}
													>
														{REGISTRATION_LABEL}
														<span>Number :</span>
														{tax_number}
													</div>
												) : null}
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="secondary"
						size="md"
						className={styles.cancel_button}
						onClick={() => setShowAssign(false)}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button size="md" loading={loading} onClick={createSubscriptionInvoice}>Assign</Button>
				</Modal.Footer>
			</Modal>

			<AddAddressModal
				addAddressModal={addAddressModal}
				setAddAddressModal={setAddAddressModal}
				getOrganizationAddresses={getOrganizationAddresses}
				orgId={orgId}
				setSelectedAddress={setSelectedAddress}
			/>
		</>
	);
}

export default AssignModal;
