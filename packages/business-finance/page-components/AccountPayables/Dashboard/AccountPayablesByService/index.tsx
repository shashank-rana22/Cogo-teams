import { Tooltip, Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetPayablesByService from '../hooks/useGetPayablesByService';

import styles from './styles.module.css';

interface ItemProps {
	activeEntity: string;
}

function AccountPayablesByService({ activeEntity }:ItemProps) {
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const [activeBox, setActiveBox] = useState(null);
	const handleClick = () => {
		setIsAccordionActive(true);
	};
	const { data, loading } = useGetPayablesByService({ activeEntity });
	const { list, currency } = data || {};

	const oceanData = list?.slice(0, 4);
	const airData = list?.slice(4, 6);
	const surfaceData = list?.slice(6, 8);
	const overseasData = list?.slice(8, 9);

	const oceanAmount = oceanData?.reduce((acc, service) => acc + service.amount, 0);
	const airAmount = airData?.reduce((acc, service) => acc + service.amount, 0);
	const surfaceAmount = surfaceData?.reduce((acc, service) => acc + service.amount, 0);
	const overseas = overseasData?.reduce((acc, service) => acc + service.amount, 0);

	const SERVICE_MAPPING = [
		{
			service        : 'Ocean',
			formatedAmount : oceanAmount,
		},
		{
			service        : 'Air',
			formatedAmount : airAmount,
		},
		{
			service        : 'Surface',
			formatedAmount : surfaceAmount,
		},
		{
			service        : 'Overseas',
			formatedAmount : overseas,
		},
		{
			service        : 'Overheads',
			formatedAmount : 0,
		},
	];

	const amountBoxData = () => {
		switch (activeBox) {
			case 'Ocean':
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
									<Tooltip
										content={
										formatAmount({
											amount  : list[0]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})
										}
										interactive
									>
										<div>
											{formatAmount({
												amount  : list[0]?.amount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
										</div>
									</Tooltip>
								</div>
							</div>
							<div className={styles.vr} />
							<div className={styles.sub_container}>
								<div className={styles.label}>
									FCL Exports
								</div>
								<div className={styles.ocean_value}>
									<Tooltip
										content={
										formatAmount({
											amount  : list[1]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})
										}
										interactive
									>
										<div>
											{formatAmount({
												amount  : list[1]?.amount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
										</div>
									</Tooltip>
								</div>
							</div>
							<div className={styles.vr} />
							<div className={styles.sub_container}>
								<div className={styles.label}>
									LCL Imports
								</div>
								<div className={styles.ocean_value}>
									<Tooltip
										content={
										formatAmount({
											amount  : list[2]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})
										}
										interactive
									>
										<div>
											{formatAmount({
												amount  : list[2]?.amount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
										</div>
									</Tooltip>
								</div>
							</div>
							<div className={styles.vr} />
							<div className={styles.sub_container}>
								<div className={styles.label}>
									LCL Exports
								</div>
								<div className={styles.ocean_value}>
									<Tooltip
										content={
										formatAmount({
											amount  : list[3]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})
										}
										interactive
									>
										<div>
											{formatAmount({
												amount  : list[3]?.amount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
										</div>
									</Tooltip>
								</div>
							</div>

						</div>
					</div>
				);
			case 'Air':
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
								<Tooltip
									content={formatAmount({
										amount  : list[4]?.amount,
										currency,
										options : {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}
									interactive
								>
									<div>
										{formatAmount({
											amount  : list[4]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
												notation        : 'compact',
												compactDisplay  : 'short',
											},
										})}

									</div>
								</Tooltip>
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								International
							</div>
							<div className={styles.ocean_value}>
								<Tooltip
									content={formatAmount({
										amount  : list[5]?.amount,
										currency,
										options : {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}
									interactive
								>
									<div>
										{formatAmount({
											amount  : list[5]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
												notation        : 'compact',
												compactDisplay  : 'short',
											},
										})}

									</div>
								</Tooltip>
							</div>
						</div>

					</div>
				);
			case 'Surface':
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
								<Tooltip
									content={formatAmount({
										amount  : list[6]?.amount,
										currency,
										options : {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}
									interactive
								>
									<div>
										{formatAmount({
											amount  : list[6]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
												notation        : 'compact',
												compactDisplay  : 'short',
											},
										})}

									</div>
								</Tooltip>
							</div>
						</div>
						<div className={styles.vr} />
						<div className={styles.sub_container}>
							<div className={styles.label}>
								Haulage
							</div>
							<div className={styles.ocean_value}>
								<Tooltip
									content={formatAmount({
										amount  : list[7]?.amount,
										currency,
										options : {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}
									interactive
								>
									<div>
										{formatAmount({
											amount  : list[7]?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
												notation        : 'compact',
												compactDisplay  : 'short',
											},
										})}

									</div>
								</Tooltip>
							</div>
						</div>

					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div>
			<div
				className={isAccordionActive ? styles.container : styles.div_container}
			>
				<div className={styles.heading}>
					Account Payables By Segments
				</div>
				<div className={styles.hr} />

				<div className={styles.amount_container}>

					{SERVICE_MAPPING.map((item) => (
						loading ? (
							<Placeholder
								key={item?.service}
								height="30px"
								width="200px"
								margin="0px 12px 26px 0px"
							/>
						)
							: (
								<div
									key={item?.service}
									className={activeBox === item?.service ? styles.sub_container_click : styles.amount}
									onClick={() => {
										handleClick();
										setActiveBox(item?.service);
									}}
									role="presentation"
								>
									<div className={styles.label}>
										{item?.service}
									</div>
									<div className={styles.value}>

										{
											formatAmount({
												amount  : item?.formatedAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
												},
											})
										}
									</div>
								</div>
							)
					))}
				</div>
				<div>
					{amountBoxData()}
				</div>
			</div>
			{activeBox !== null
				&& (
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
