import { Button, cl } from '@cogoport/components';
import { IcMPlusInCircle, IcMArrowRight, IcCVerySad } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetAddress from '../../hooks/useGetAddress';

import AddressCard from './AddressCard';
import styles from './styles.module.css';

function Address({ billingType = '', orgId = '' }) {
	const [selectedAddress, setSelectedAddress] = useState({});

	const [addressModal, setAddressModal] = useState({
		isCreate  : false,
		isView    : false,
		openModal : false,
	});

	const { loading, addressData = [] } = useGetAddress({ billingType, orgId });
	const { mainAddress = [], allAddress = [] } = addressData || {};
	const addressList = loading ? [...Array(2).keys()] : mainAddress;

	return (
		<>
			<div className={cl`${styles.header} ${styles.flex_box}`}>
				<div className={styles.flex_box}>
					<h3 className={styles.title}>Billing Details</h3>
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
						<span className={styles.btn_text}>Add New Address</span>
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
							<span className={styles.btn_text}>View All</span>
							{' '}
							<IcMArrowRight />
						</Button>
					) : null}
				</div>
			</div>

			{isEmpty(mainAddress) && !loading
				? (
					<div className={styles.empty_state}>
						<IcCVerySad width={30} height={30} />
						<h2>No Address Found</h2>
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

			{/* {addressModal.openModal ? (
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
			) : null} */}

		</>
	);
}

export default Address;
