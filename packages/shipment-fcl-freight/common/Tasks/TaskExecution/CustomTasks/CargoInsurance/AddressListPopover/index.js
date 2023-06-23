import { Placeholder, Checkbox, cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMPlansExpiring,
	IcMCrossInCircle,
	IcMPlus,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { v4 as uuid } from 'uuid';

import AddModal from './AddAddressModal';
import styles from './styles.module.css';

const CARD_LENGTH = 3;

function Addres({
	data = [],
	checked = [],
	setChecked = () => {},
	loading = false,
	setshowFilters = () => {},
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
						themeType="primary"
						onClick={() => {
							setshowFilters(false);
						}}
					>
						<IcMCrossInCircle />
					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						onClick={() => setAddAddressModal(true)}
					>
						<IcMPlus height="20px" width="20px" />
					</Button>
				)}
			</div>

			{loading ? (
				<div>
					{/* {[...Array(CARD_LENGTH)]?.map(() => (
						<div className={styles.card} key={uuid()}>
							<div className={styles.section}>
								<Placeholder className="checkboxPlaceholder" />
							</div>

							<div className={cl`${styles.Section} ${styles.info}`}>
								<Placeholder />
								<div className="number footerPlaceholder">
									<Placeholder />
									<Placeholder />
								</div>
							</div>
						</div>
					))} */}
					hii
				</div>
			) : (
				<div className={styles.address_container}>
					{isEmpty(data) && (
						<div className={styles.empty_state}>
							<IcMPlansExpiring width={100} height={100} />
							<div className="txt">No Data Found</div>
						</div>
					)}

					{!isEmpty(data)
						&& (data || []).map((item) => {
							const {
								name,
								pincode,
								tax_number,
								organization_pocs = [],
								address,
							} = item;

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
											{organization_pocs[GLOBAL_CONSTANTS.zeroth_index]?.mobile_country_code
											&& organization_pocs[GLOBAL_CONSTANTS.zeroth_index]?.mobile_number ? (
												<div className={styles.card_txt}>
													{`${organization_pocs[GLOBAL_CONSTANTS.zeroth_index]?.mobile_country_code} ${organization_pocs[GLOBAL_CONSTANTS.zeroth_index]?.mobile_number}`}
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

export default Addres;
