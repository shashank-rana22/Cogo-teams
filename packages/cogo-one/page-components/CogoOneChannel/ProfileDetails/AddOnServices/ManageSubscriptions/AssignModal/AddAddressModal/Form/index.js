import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { MANDENTORY_BILLING_ITEMS, POC_BILLING_ITEMS } from '../../../../../../../../constants/addOnServices';
import RenderElement from '../RenderElement';
import styles from '../styles.module.css';

const getSpecifiedControls = ({
	addAddressControls = [],
	name = '',
}) => (addAddressControls || []).filter((item) => item.name === name)?.[GLOBAL_CONSTANTS.zeroth_index] || {};

function Form({
	addAddressControls = [],
	isIncludeTaxNumber = false,
	control = {},
	errors = {},
}) {
	const [showPoc, setShowPoc] = useState(false);

	const taxNumber = getSpecifiedControls({ addAddressControls, name: 'tax_number' });
	const addressTypeChips = getSpecifiedControls({ addAddressControls, name: 'address_type' });

	return (
		<div>
			<div className={styles.section_title}>
				<div className={styles.billing_title}>
					Billing Details
				</div>
			</div>
			<div className={styles.element_row}>
				{(addAddressControls || []).map((item) => {
					if ((MANDENTORY_BILLING_ITEMS || []).includes(item.name)) {
						return (
							<RenderElement
								key={item.name}
								item={item}
								control={control}
								errors={errors}
							/>
						);
					}
					return null;
				})}
			</div>

			{taxNumber && isIncludeTaxNumber && (
				<>
					<RenderElement
						key={taxNumber.name}
						item={taxNumber}
						control={control}
						errors={errors}
					/>
					{!showPoc && (
						<Button
							themeType="accent"
							onClick={() => setShowPoc(!showPoc)}
							className={styles.poc_button}
						>
							<IcMPlus />
							Add POC
						</Button>
					)}
				</>
			)}
			<div className={styles.element_row}>
				{(addAddressControls || []).map((item) => {
					if ((POC_BILLING_ITEMS || []).includes(item.name) && showPoc && isIncludeTaxNumber) {
						return (
							<RenderElement
								key={taxNumber.name}
								item={item}
								control={control}
								errors={errors}
							/>
						);
					}
					return null;
				})}
			</div>

			{!isIncludeTaxNumber && addressTypeChips && (
				<div className={styles.address_type}>
					<div className={styles.address_save_label}>
						Save address as
					</div>
					<RenderElement
						key={addressTypeChips.name}
						item={addressTypeChips}
						control={control}
						errors={errors}
					/>
				</div>
			)}
		</div>
	);
}

export default Form;
