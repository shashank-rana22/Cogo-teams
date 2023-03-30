/* eslint-disable no-unsafe-optional-chaining */
import { Tooltip, Placeholder } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetPayablesByService from '../hooks/useGetPayablesByService';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import styles from './styles.module.css';

interface ItemProps {
	activeTab:string,
}

function AccountPayablesByService({ activeTab }:ItemProps) {
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const [activeBox, setActiveBox] = useState(null);
	const handleClick = () => {
		setIsAccordionActive(true);
	};
	const { data = [], loading } = useGetPayablesByService({ activeTab });
	const oceanAmount = data?.[0]?.amount + data?.[1]?.amount + data?.[2]?.amount + data?.[3]?.amount;
	const airAmount = data?.[4]?.amount + data?.[5]?.amount;
	const surfaceAmount = data?.[6]?.amount + data?.[7]?.amount;
	const overseas = data?.[8]?.amount;

	const amountBoxData = () => {
		if (activeBox === 'ocean') {
			return (
				<div>
					<div className={styles.imports_container}>
						<div className={styles.sub_container}>
							<div className={styles.ocean_text}>
								Ocean
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								FCL Imports
							</div>
							<div className={styles.ocean_value}>
								<Tooltip content={getFormattedPrice(data[0]?.amount, 'INR')} interactive>
									{getAmountInLakhCrK(data[0]?.amount)}
								</Tooltip>
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								FCL Exports
							</div>
							<div className={styles.ocean_value}>
								<Tooltip content={getFormattedPrice(data[1]?.amount, 'INR')} interactive>
									{getAmountInLakhCrK(data[1]?.amount)}
								</Tooltip>
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								LCL Imports
							</div>
							<div className={styles.ocean_value}>
								<Tooltip content={getFormattedPrice(data[2]?.amount, 'INR')} interactive>
									{getAmountInLakhCrK(data[2]?.amount)}
								</Tooltip>
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								LCL Exports
							</div>
							<div className={styles.ocean_value}>
								<Tooltip content={getFormattedPrice(data[3]?.amount, 'INR')} interactive>
									{getAmountInLakhCrK(data[3]?.amount)}
								</Tooltip>
							</div>
						</div>

					</div>
				</div>
			);
		}
		if (activeBox === 'air') {
			return (
				<div className={styles.imports_container}>
					<div className={styles.sub_container}>
						<div className={styles.ocean_text}>
							Air
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							Domestic
						</div>
						<div className={styles.ocean_value}>
							<Tooltip content={getFormattedPrice(data[4]?.amount, 'INR')} interactive>
								{getAmountInLakhCrK(data[4]?.amount)}
							</Tooltip>
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							International
						</div>
						<div className={styles.ocean_value}>
							<Tooltip content={getFormattedPrice(data[5]?.amount, 'INR')} interactive>
								{getAmountInLakhCrK(data[5]?.amount)}
							</Tooltip>
						</div>
					</div>

				</div>
			);
		}
		if (activeBox === 'surface') {
			return (
				<div className={styles.imports_container}>

					<div className={styles.sub_container}>
						<div className={styles.ocean_text}>
							Surface
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							Trailer
						</div>
						<div className={styles.ocean_value}>
							<Tooltip content={getFormattedPrice(data[6]?.amount, 'INR')} interactive>
								{getAmountInLakhCrK(data[6]?.amount)}
							</Tooltip>
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							Haulage
						</div>
						<div className={styles.ocean_value}>
							<Tooltip content={getFormattedPrice(data[7]?.amount, 'INR')} interactive>
								{getAmountInLakhCrK(data[7]?.amount)}
							</Tooltip>
						</div>
					</div>

				</div>
			);
		}
		return null;
	};

	return (
		<div>
			<div
				className={styles.container}
				style={{
					transition : 'max-height 0.3s ease-in-out',
					maxHeight  : isAccordionActive ? '430px' : '125px',
				}}
			>
				<div className={styles.heading}>
					Account Payables By Segments
				</div>
				<div className={styles.hr} />
				<div className={styles.amount_container}>
					{loading ? <Placeholder height="30px" width="200px" margin="0px 12px 26px 0px" />
						: (
							<div
								className={activeBox === 'ocean' ? styles.sub_container_click : styles.amount}
								onClick={() => {
									handleClick();
									setActiveBox('ocean');
								}}
								role="presentation"
							>
								<div className={styles.label}>
									Ocean
								</div>
								<div className={styles.value}>
									{getFormattedPrice(oceanAmount, 'INR')}
								</div>
							</div>
						)}
					{loading ? <Placeholder height="30px" width="200px" margin="0px 12px 26px 0px" />
						: (
							<div
								className={activeBox === 'air' ? styles.sub_container_click : styles.amount}
								onClick={() => {
									handleClick();
									setActiveBox('air');
								}}
								role="presentation"
							>
								<div className={styles.label}>
									Air
								</div>
								<div className={styles.value}>
									{getFormattedPrice(airAmount, 'INR')}
								</div>
							</div>
						)}
					{loading ? <Placeholder height="30px" width="200px" margin="0px 12px 26px 0px" />
						: (
							<div
								className={activeBox === 'surface' ? styles.sub_container_click : styles.amount}
								onClick={() => {
									handleClick();
									setActiveBox('surface');
								}}
								role="presentation"
							>
								<div className={styles.label}>
									Surface
								</div>
								<div className={styles.value}>
									{getFormattedPrice(surfaceAmount, 'INR')}
								</div>
							</div>
						)}
					{loading ? <Placeholder height="30px" width="200px" margin="0px 12px 26px 0px" />
						: (
							<div
								className={activeBox === 'overseas' ? styles.sub_container_click : styles.amount}
								onClick={() => {
									handleClick();
									setActiveBox('overseas');
								}}
								role="presentation"
							>
								<div className={styles.label}>
									Overseas
								</div>
								<div className={styles.value}>
									{getFormattedPrice(overseas, 'INR')}
								</div>
							</div>
						)}
					{loading ? <Placeholder height="30px" width="200px" margin="0px 12px 26px 0px" />
						: (
							<div
								className={activeBox === 'overheads' ? styles.sub_container_click : styles.amount}
								onClick={() => {
									handleClick();
									setActiveBox('overheads');
								}}
								role="presentation"
							>
								<div className={styles.label}>
									Overheads
								</div>
								<div className={styles.value}>
									{getFormattedPrice(0, 'INR')}
								</div>
							</div>
						)}
				</div>
				<div>
					{amountBoxData()}
				</div>
			</div>
			{activeBox === null
				? null : (
					<div className={styles.footer}>
						<div
							className={styles.footer_text}
							onClick={() => {
								setIsAccordionActive(false);
								setActiveBox(null);
							}}
							role="presentation"
						>
							Show less
							<IcMArrowDown height={15} width={15} className={styles.down} />
						</div>
					</div>
				)}
		</div>
	);
}

export default AccountPayablesByService;
