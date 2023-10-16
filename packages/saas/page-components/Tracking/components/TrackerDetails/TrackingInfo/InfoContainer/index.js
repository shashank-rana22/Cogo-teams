import { Select, cl, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import getMappingObject from '../../../../constant/card';

import styles from './styles.module.css';

const getOptions = ({ containerDetails = [] }) => containerDetails.map((item) => ({
	label : item?.container_no,
	value : item,
}));

const COLOR = {
	shipper   : 'blue',
	consignee : 'orange',
};

const SINGLE_DETAIL_INDEX = 1;

function InfoContainer({
	containerDetails = [], currContainerDetails = {}, setCurrContainerDetails = () => {},
	shipmentInfo = {}, trackingType = '', poc_details = [], airwayBillNo = '',
}) {
	const { container_no = '', container_length = '', container_description = '' } = currContainerDetails || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const GET_MAPPING = getMappingObject({ t });

	const MAPPING = GET_MAPPING[trackingType];
	const { CARD_TITLE, SHIPMENT_TITLE, SHIPMENT_INFO } = MAPPING;

	const { traderInfo, ...restInfo } = useMemo(() => {
		const { commodity = '', hs_code = '', weight = '', piece = '' } = shipmentInfo || {};
		const SHIPPER_ARR = [];
		const CONSIGNEE_ARR = [];

		poc_details.forEach((detail) => {
			if (detail?.user_type === 'SHIPPER') {
				SHIPPER_ARR.push(detail);
			} else if (detail?.user_type === 'CONSIGNEE') {
				CONSIGNEE_ARR.push(detail);
			}
		});

		const shipperDetails =	SHIPPER_ARR[GLOBAL_CONSTANTS.zeroth_index] || {};
		const consigneeDetails = CONSIGNEE_ARR[GLOBAL_CONSTANTS.zeroth_index] || {};
		const incoterm = shipmentInfo?.incoterm;

		return {
			incoterm,
			commodity: hs_code ? (
				<span>
					{commodity && <span>{`${commodity} - `}</span>}
					<span>
						(
						{hs_code}
						)
					</span>
				</span>
			) : '',
			traderInfo: { shipper: shipperDetails?.name, consignee: consigneeDetails?.name },
			weight,
			piece,
		};
	}, [poc_details, shipmentInfo]);

	return (
		<div className={styles.container}>

			<div className={styles.title_container}>
				<h3 className={styles.title}>{SHIPMENT_TITLE}</h3>
				<div className={styles.line} />
			</div>

			<div className={cl`${styles.info}
				${containerDetails?.length > SINGLE_DETAIL_INDEX ? styles.without_info_field : styles.info_field}`}
			>
				<p className={styles.info_text}>
					{trackingType === 'ocean' ? CARD_TITLE.CONTAINER_NO : CARD_TITLE}
				</p>

				{containerDetails?.length > SINGLE_DETAIL_INDEX
					? (
						<Select
							size="sm"
							className={styles.select_field}
							value={currContainerDetails}
							onChange={setCurrContainerDetails}
							options={getOptions({ containerDetails })}
						/>
					) : (
						<Pill className={styles.pill_text} color="#fff">{container_no || airwayBillNo}</Pill>
					)}
			</div>

			<div className={styles.data_container}>
				{(container_length || container_description) && (
					<div className={styles.image_row}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.container2}
							width={50}
							height={40}
						/>

						<div className={styles.data_text}>
							{container_length && <span>{`${container_length} FT, `}</span>}
							{container_description && <span>{container_description}</span>}
						</div>
					</div>
				)}

				{Object.keys(SHIPMENT_INFO).map((item) => {
					const data = restInfo?.[item] || '--';
					if (item === 'container_no') return <React.Fragment key={item} />;
					return (
						<div key={item} className={styles.row}>
							<span className={styles.data_title}>{SHIPMENT_INFO[item]}</span>
							<span className={styles.data_seperator}>:</span>
							<span>{data}</span>
						</div>
					);
				})}
			</div>

			{(traderInfo.shipper || traderInfo.consignee) && (
				<div className={styles.footer}>

					{Object.keys(traderInfo).map((trader) => {
						const name = traderInfo?.[trader] || '';
						if (isEmpty(name)) return <React.Fragment key={trader} />;

						return (
							<Pill
								key={trader}
								color={COLOR[trader]}
							>
								{`${startCase(trader)} : ${name}`}
							</Pill>
						);
					})}
				</div>
			)}

		</div>
	);
}

export default InfoContainer;
