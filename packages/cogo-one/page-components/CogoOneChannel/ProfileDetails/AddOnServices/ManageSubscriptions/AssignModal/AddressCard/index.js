import { Radio, cl, Placeholder } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

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

function AddressCard({
	addressLoading = false, billingAddresses = [], selectedAddress = {},
	setSelectedAddress = () => {},
}) {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	return (
		<div>
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
									className={cl`${styles.card} ${isChecked
										? styles.is_active_card : ''}`}
									onClick={() => {
										setSelectedAddress(item);
									}}
								>
									{addressType && (
										<div className={cl`${styles.address_type} 
													${isChecked ? styles.checked_address_type : ''}`}
										>
											{startCase(addressType)}
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
	);
}

export default AddressCard;
