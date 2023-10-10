import { Button, Toggle, cl } from '@cogoport/components';
import { IcMArrowRight, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import useAddress from '../../../hooks/useAddress';

import AddressCard from './AddressCard';
import AddressModal from './AddressModal';
import styles from './styles.module.css';

const MAX_ADDRESS_TO_DISPLAY = 2;

function Address({ billingType, setBillingType }) {
	const [selectedAddress, setSelectedAddress] = useState({});
	const [addressModal, setAddressModal] = useState({
		isCreate  : false,
		isView    : false,
		openModal : false,
	});

	const { data, loading } = useAddress({ billingType });

	return (
		<>
			<div className={cl`${styles.header} ${styles.flex_box}`}>
				<div className={styles.flex_box}>
					<h3 className={styles.title}>Billing Details</h3>
					<Toggle
						size="sm"
						onLabel="Individual"
						offLabel="Corporate"
						value={billingType}
						onChange={(e) => setBillingType(e.target.checked ? 'Individual' : 'Corporate')}
					/>
				</div>

				<div className={styles.flex_box}>
					<Button size="sm" themeType="accent">
						<IcMPlusInCircle width={12} height={12} />
						{' '}
						<span className={styles.btn_text}>Add New Address</span>
					</Button>

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
				</div>
			</div>

			<div className={styles.flex_box}>
				{data.map((ele, index) => (
					index < MAX_ADDRESS_TO_DISPLAY ? (
						<div key={ele?.id} className={styles.card_container}>
							<AddressCard
								info={ele}
								loading={loading}
								selectedAddress={selectedAddress}
								setSelectedAddress={setSelectedAddress}
							/>
						</div>

					) : null
				))}
			</div>

			<AddressModal
				data={data}
				addressModal={addressModal}
				setAddressModal={setAddressModal}
				selectedAddress={selectedAddress}
				setSelectedAddress={setSelectedAddress}
			/>

		</>
	);
}

export default Address;
