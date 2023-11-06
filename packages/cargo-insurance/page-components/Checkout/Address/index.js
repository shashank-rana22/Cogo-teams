import { Button, Toggle, cl } from '@cogoport/components';
import { IcCVerySad, IcMArrowRight, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useImperativeHandle, forwardRef } from 'react';

import useGetAddress from '../../../hooks/useGetAddress';

import AddressCard from './AddressCard';
import AddressModal from './AddressModal';
import styles from './styles.module.css';

function Address({ billingType, setBillingType, orgId = '', preSelectedAddress = {} }, ref) {
	const { t } = useTranslation(['cargoInsurance']);

	const [selectedAddress, setSelectedAddress] = useState({});
	const [addressModal, setAddressModal] = useState({
		isCreate  : false,
		isView    : false,
		openModal : false,
	});

	const {
		addressData, setAddressData,
		loading, getBillingAddress,
	} = useGetAddress({ billingType, setSelectedAddress, orgId, preSelectedAddress });

	const { mainAddress = [], allAddress = [] } = addressData || {};
	const addressList = loading ? [...Array(2).keys()] : mainAddress;

	useImperativeHandle(ref, () => () => selectedAddress, [selectedAddress]);

	return (
		<>
			<div className={cl`${styles.header} ${styles.flex_box}`}>
				<div className={styles.flex_box}>
					<h3 className={styles.title}>{t('cargoInsurance:address_title')}</h3>
					<Toggle
						size="sm"
						onLabel="Individual"
						offLabel="Corporate"
						value={billingType}
						onChange={(e) => setBillingType(e.target.checked ? 'Individual' : 'Corporate')}
					/>
				</div>

				<div className={styles.flex_box}>
					<Button
						size="sm"
						themeType="accent"
						onClick={() => setAddressModal({
							openModal : true,
							isView    : false,
							isCreate  : true,
						})}
					>
						<IcMPlusInCircle width={12} height={12} />
						{' '}
						<span className={styles.btn_text}>{t('cargoInsurance:create_address')}</span>
					</Button>

					{allAddress.length > 2 ? (
						<Button
							themeType="linkUi"
							onClick={() => setAddressModal({
								openModal : true,
								isView    : true,
								isCreate  : false,
							})}
						>
							<span className={styles.btn_text}>{t('cargoInsurance:address_view')}</span>
							{' '}
							<IcMArrowRight />
						</Button>
					) : null}
				</div>
			</div>

			{isEmpty(mainAddress) && !loading ? (
				<div className={styles.empty_state}>
					<IcCVerySad width={30} height={30} />
					<h2>{t('cargoInsurance:address_empty')}</h2>
				</div>
			) : null}

			<div className={styles.flex_box}>
				{(addressList || []).map((ele) => (
					<div key={ele?.id} className={styles.card_container}>
						<AddressCard
							info={ele}
							loading={loading}
							selectedAddress={selectedAddress}
							setSelectedAddress={setSelectedAddress}
						/>
					</div>
				))}
			</div>

			{addressModal.openModal ? (
				<AddressModal
					orgId={orgId}
					data={allAddress}
					setAddressData={setAddressData}
					addressModal={addressModal}
					setAddressModal={setAddressModal}
					selectedAddress={selectedAddress}
					getBillingAddress={getBillingAddress}
					setSelectedAddress={setSelectedAddress}
				/>
			) : null}

		</>
	);
}

export default forwardRef(Address);
