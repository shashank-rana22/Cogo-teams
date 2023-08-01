import { Placeholder, Checkbox, cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlansExpiring, IcMCrossInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import AddModal from './AddAddressModal';
import styles from './styles.module.css';

const CARD_LENGTH = 3;

function AddressListPopover({
	data = [],
	checked = [],
	setChecked = () => {},
	loading = false,
	setShowFilters = () => {},
	policyForSelf = false,
	setAddAddressModal = () => {},
	setProsporerAddress = () => {},
	addAddressModal = false,
	shipmentData = {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.title}>Select Address</div>
				{policyForSelf ? (
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setAddAddressModal(true)}
					>
						<IcMPlus height="20px" width="20px" />
					</Button>
				) : (
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShowFilters(false)}
					>
						<IcMCrossInCircle />
					</Button>
				) }
			</div>

			{loading ? (
				<div>
					{[...Array(CARD_LENGTH).keys()].map((i) => (
						<div className={styles.card} key={i}>
							<div className={styles.section}>
								<Placeholder />
							</div>

							<div className={cl`${styles.Section} ${styles.info}`}>
								<Placeholder />
								<div>
									<Placeholder />
									<Placeholder />
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.address_container}>
					{isEmpty(data)
						? (
							<div className={styles.empty_state}>
								<IcMPlansExpiring width={100} height={100} />
								<div className={styles.txt}>No Data Found</div>
							</div>
						) : (
							<div>

								{(data || []).map((item) => {
									const {
										name,
										pincode,
										tax_number,
										organization_pocs = [],
										address,
									} = item || {};
									const organization_poc_at_zeroth_index = organization_pocs?.
										[GLOBAL_CONSTANTS.zeroth_index];

									return (
										<div className={styles.card} key={item.id} role="presentation">
											<div className={styles.section}>
												<Checkbox
													checked={checked.includes(item.id)}
													onChange={() => {
														setChecked([item?.id]);
														setProsporerAddress(item);
													}}
												/>
											</div>

											<div className={cl`${styles.section} ${styles.info}`}>
												<div
													className={cl`${styles.card_txt} ${styles.orgName}`}
												>
													{startCase(name)}

												</div>

												<div className={styles.card_txt}>{`${address} - ${pincode}`}</div>

												<div className="number">
													{organization_poc_at_zeroth_index?.mobile_country_code
											&& organization_poc_at_zeroth_index?.mobile_number ? (
												<div className={styles.card_txt}>
													{
													`${organization_poc_at_zeroth_index?.mobile_country_code} `
													+ `${organization_poc_at_zeroth_index?.mobile_number}`
}

												</div>
														) : null}

													<div className={styles.card_txt}>{tax_number}</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
				</div>
			)}

			{addAddressModal ? (
				<AddModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
					shipmentData={shipmentData}
				/>
			) : null}
		</div>
	);
}

export default AddressListPopover;
