import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcACarriageInsurancePaidTo, IcCFtick, IcMInfo, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function CargoInsuranceContainer({
	cargoInsuranceDetails = {},
	setShowDeleteModal = () => {},
	setShowModal = () => {},
}) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => { setIsHovered(true); };
	const handleMouseLeave = () => { setIsHovered(false); };

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	return (
		<div className={styles.wrapper}>
			<div className={styles.left_section}>

				<IcACarriageInsurancePaidTo
					width={32}
					height={32}
				/>

				<span className={styles.label}>Cargo Insurance</span>
			</div>

			<div className={styles.right_section}>
				{isEmpty(cargoInsuranceDetails) ? (
					<Tooltip
						content={(
							<div className={styles.tooltip_content}>
								Starting at 0.05% of cargo value or &#x20B9;500 (whichever is maximum)
							</div>
						)}
						placement="top"
					>
						<IcMInfo className={styles.starting_at_price} />
					</Tooltip>
				) : (
					<strong className={styles.rate_found}>
						{formatAmount({
							currency : cargoInsuranceDetails?.total_price_currency,
							amount   : cargoInsuranceDetails?.total_price_discounted,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</strong>
				)}

				{!isEmpty(cargoInsuranceDetails) ? (
					<SelectedIcon
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						height={25}
						width={25}
						className={styles.tick_icon}
						onClick={() => setShowDeleteModal(true)}
					/>
				) : (
					<IcMPlus
						height={22}
						width={22}
						className={styles.add_icon}
						fill="black"
						onClick={() => setShowModal(true)}
					/>
				)}
			</div>
		</div>
	);
}

export default CargoInsuranceContainer;
