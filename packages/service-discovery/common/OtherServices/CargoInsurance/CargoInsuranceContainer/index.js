import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcACarriageInsurancePaidTo, IcCFtick, IcMInfo, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SecureNow from '../../../SecureNow';

import styles from './styles.module.css';

function CargoInsuranceContainer({
	cargoInsuranceDetails = {},
	setShowDeleteModal = () => {},
	setShowModal = () => {},
	isMobile = false,
}) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => { setIsHovered(true); };
	const handleMouseLeave = () => { setIsHovered(false); };

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	const handleDelete = (event) => {
		event.stopPropagation();
		event.preventDefault();
		setShowDeleteModal(true);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.left_section}>
				<IcACarriageInsurancePaidTo
					width={32}
					height={32}
				/>

				<div className={styles.left_content}>
					<span className={styles.label}>Cargo Insurance</span>

					<SecureNow />
				</div>
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
								maximumFractionDigits : 2,
							},
						})}
					</strong>
				)}

				{!isEmpty(cargoInsuranceDetails) ? (
					<SelectedIcon
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						height={isMobile ? 18 : 25}
						width={isMobile ? 18 : 25}
						className={styles.tick_icon}
						onClick={handleDelete}
					/>
				) : (
					<IcMPlus
						height={isMobile ? 16 : 22}
						width={isMobile ? 16 : 22}
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
