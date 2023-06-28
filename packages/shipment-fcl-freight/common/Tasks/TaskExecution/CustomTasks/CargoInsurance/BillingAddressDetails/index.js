import { Loader, Toast, Popover, Radio, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useMemo, useState, useContext } from 'react';

import useGetStateFromPincode from '../../../../../../hooks/useGetStateFromPincode';
import useListAddressForInsurance from '../../../../../../hooks/useListAddressForInsurance';
import addres from '../AddressListPopover';
import { bilingAddressControl } from '../controls/bilingAddressControl';
import { bilingAddressControlForSelf } from '../controls/bilingAddressControlForSelf';

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
	const [showFilters, setshowFilters] = useState(false);
	const [addAddressModal, setAddAddressModal] = useState(false);
	const { shipment_data } = useContext(
		ShipmentDetailContext,
	);

	const { data, loading: addressLoading } = useListAddressForInsurance({
		organization_id: shipment_data?.importer_exporter?.id,
	});

	const {
		watch,
		setValue,
		control,
		formState: { errors },
	} = formProps;

	const pincode = watch('billingPincode');

	const { cityState } = useGetStateFromPincode({ pincode, policyForSelf });
	const { region, city } = cityState?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	useMemo(() => {
		if (isEmpty(cityState)) {
			Toast.error('Invalid Pincode');
		}
		if (city || region?.name) {
			setValue('city', city?.name);
			setValue('state', region?.name);
		}
	}, [cityState, city, region?.name, setValue]);

	return (
		<div>
			{policyForSelf ? (
				<div className={styles.popover}>
					<Layout
						fields={bilingAddressControl}
						control={control}
						errors={errors}
					/>
					<Popover
						placement="bottom"
						visible={showFilters && !addAddressModal}
						trigger="click"
						render={addres({
							data,
							checked,
							setChecked,
							loading      : addressLoading,
							setshowFilters,
							policyForSelf,
							addAddressModal,
							setAddAddressModal,
							setProsporerAddress,
							shipmentData : shipment_data,
						})}
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
								{(data || []).map((item) => (
									<div className={styles.billing_party_container} key={item.id}>
										<Radio
											style={{ marginTop: '3px' }}
											checked={item.id === billingData.billingId}
											onChange={() => setBillingData({
												address_type   : item.address_type,
												billingId      : item.id,
												gstin          : item.tax_number,
												billingAddress : item.address,
												billingCity    : item.city,
												billingPincode : item.pincode,
												billingState   : item.state,
												partyName      : item.name,
											})}
										/>
										<div className={styles.details}>
											<div className={styles.billing_party}>{startCase(item?.name)}</div>
											<div className={cl`${styles.billing_party} ${styles.details}`}>
												{item?.tax_number}
											</div>
											<div className={cl`${styles.billing_party} ${styles.details}`}>
												{item?.address}
												,
												{item?.city}
												,
												{item?.state}
												,
												{item?.pincode}
											</div>
										</div>
									</div>
								))}
							</div>
							<Layout
								fields={bilingAddressControlForSelf}
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
						<div className={`${styles.card_txt} ${styles.orgName}`}>
							{startCase(prosporerAddress?.name)}
						</div>
						<div className={`${styles.card_txt} ${styles.orgName}`}>
							{`${startCase(prosporerAddress?.address)} - ${
								prosporerAddress?.pincode
							}`}
						</div>
						<div className={`${styles.card_txt} ${styles.orgName}`}>{prosporerAddress?.tax_number}</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
export default BillingAddressDetails;
