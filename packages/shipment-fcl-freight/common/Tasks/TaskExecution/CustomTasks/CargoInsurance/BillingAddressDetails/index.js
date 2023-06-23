import {
	Loader,
	Toast,
	Popover,
	Radio,
	cl,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useEffect, useMemo, useState } from 'react';

import useGetStateFromPincode from '../../../../../../hooks/useGetStateFromPincode';
import useListAddressForInsurance from '../../../../../../hooks/useListAddressForInsurance';
import addres from '../AddressListPopover';
import { bilingAddressControl } from '../utils/bilingAddressControl';
import { bilingAddressControlForSelf } from '../utils/bilingAddressControlForSelf';

import styles from './styles.module.css';

function BillingAddressDetails({
	policyForSelf = true,
	formProps = {},
	billingData = {},
	setBillingData = () => {},
	formData = {},
	setFormData = () => {},
	insuranceDetails = {},
	shipmentData = {},
	prosporerAddress = {},
	setProsporerAddress = () => {},
	checked = [],
	setChecked = () => {},
}) {
	const [showFilters, setshowFilters] = useState(false);
	const [addAddressModal, setAddAddressModal] = useState(false);

	const { data, loading: addressLoading } = useListAddressForInsurance({
		organization_id: shipmentData?.importer_exporter?.id,
	});

	const {
		watch,
		setValue,
		control,
		formState: { errors },
	} = formProps;

	const formValues = watch();
	const pincode = watch('billingPincode');

	const { cityState } = useGetStateFromPincode({ pincode, policyForSelf });
	const { list } = cityState || {};
	const { region, city } = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	useMemo(() => {
		if (isEmpty(list)) {
			Toast.error('Invalid Pincode');
		}
		if (city || region?.name) {
			setValue('billingCity', city?.name);
			setValue('billingState', region?.name);
		}
	}, [list, city, region?.name]);

	useEffect(() => {
		setFormData({ ...formData, ...formValues });
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.container}>
			{policyForSelf ? (
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
								fields={bilingAddressControlForSelf({ insuranceDetails })}
								control={control}
								errors={errors}
							/>
						</div>
					)}
				</div>
			) : (
				<div className={styles.popover}>
					<Layout
						fields={bilingAddressControl({ insuranceDetails })}
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
							loading: addressLoading,
							setshowFilters,
							policyForSelf,
							addAddressModal,
							setAddAddressModal,
							setProsporerAddress,
							shipmentData,
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
			) }

			{!policyForSelf && !isEmpty(Object.keys(prosporerAddress)) ? (
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
