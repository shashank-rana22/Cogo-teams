import { Loader, Popover, Radio, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPlus } from '@cogoport/icons-react';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import useListAddressForInsurance from '../../../../../../hooks/useListAddressForInsurance';
import AddressListPopover from '../AddressListPopover';
import { billingAddressControl } from '../controls/billingAddressControl';
import { billingAddressControlForSelf } from '../controls/billingAddressControlForSelf';

import styles from './styles.module.css';

function BillingAddressDetails({
	policyForSelf = false,
	formProps = {},
	billingData = {},
	setBillingData = () => {},
	prosporerAddress = {},
	setProsporerAddress = () => {},
	checked = [],
	setChecked = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [showFilters, setshowFilters] = useState(false);
	const [addAddressModal, setAddAddressModal] = useState(false);

	const { data, loading: addressLoading } = useListAddressForInsurance({
		organization_id: shipment_data?.importer_exporter?.id,
	});

	const {
		setValue,
		control,
		formState: { errors },
	} = formProps;

	const controls = billingAddressControlForSelf();

	return (
		<>
			{policyForSelf ? (
				<div className={styles.popover}>
					<Layout
						fields={billingAddressControl({ setValue })}
						control={control}
						errors={errors}
					/>
					<Popover
						placement="bottom"
						visible={showFilters && !addAddressModal}
						trigger="click"
						render={(
							<AddressListPopover
								data={data}
								checked={checked}
								setChecked={setChecked}
								loading={addressLoading}
								setshowFilters={setshowFilters}
								policyForSelf={policyForSelf}
								addAddressModal={addAddressModal}
								setAddAddressModal={setAddAddressModal}
								setProsporerAddress={setProsporerAddress}
								shipmentData={shipment_data}
							/>
						)}
					>
						<div
							className={styles.align_div}
							role="presentation"
							onClick={() => {
								setshowFilters(!showFilters);
							}}
						>
							<IcMPlus />
							{' '}
							Add/Change proposer address
						</div>
					</Popover>
				</div>
			) : (
				<div>
					{addressLoading ? (
						<Loader />
					) : (
						<div>
							<div className={styles.list}>
								{(data || []).map((item) => {
									const {
										address_type, id, tax_number, address, pincode, city, state, name,
									} = item || {};
									return (
										<div className={styles.billing_party_container} key={id}>
											<Radio
												style={{ marginTop: '3px' }}
												checked={id === billingData.billingId}
												onChange={() => setBillingData({
													address_type,
													billingId      : id,
													gstin          : tax_number,
													billingAddress : address,
													billingCity    : city,
													billingPincode : pincode,
													billingState   : state,
													partyName      : name,
												})}
											/>
											<div className={styles.details}>
												<span className={styles.billing_party}>{startCase(name)}</span>
												<span className={cl`${styles.billing_party} ${styles.details}`}>
													{tax_number}
												</span>
												<span className={cl`${styles.billing_party} ${styles.details}`}>
													{address}
													,
													{city}
													,
													{state}
													,
													{pincode}
												</span>
											</div>
										</div>
									);
								})}
							</div>
							<Layout
								fields={controls}
								control={control}
								errors={errors}
							/>
						</div>
					)}
				</div>
			) }

			{policyForSelf && !isEmpty(Object.keys(prosporerAddress)) ? (
				<div className={styles.section2}>
					<div className={styles.selected}>
						<span className={cl`${styles.card_txt} ${styles.orgName}`}>
							{startCase(prosporerAddress?.name)}
						</span>
						<span className={cl`${styles.card_txt} ${styles.orgName}`}>
							{`${startCase(prosporerAddress?.address)} - ${
								prosporerAddress?.pincode
							}`}
						</span>
						<span className={cl`${styles.card_txt} ${styles.orgName}`}>{prosporerAddress?.tax_number}</span>
					</div>
				</div>
			) : null}
		</>
	);
}
export default BillingAddressDetails;