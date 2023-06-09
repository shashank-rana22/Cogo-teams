import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import List from '../../commons/List';
import { AwbNumberUsedFields } from '../../configurations/awb-number-used-fields';

import styles from './styles.module.css';

const ZEROTH_INDEX = 0;

function AwbNumberUsed({
	data,
	loading,
	setFinalList,
	finalList,
	page,
	setPage,
}) {
	const { fields } = AwbNumberUsedFields;
	const router = useRouter();

	const redirectToShipment = (shipmentId) => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipmentId}`;
		window.open(
			newUrl,
			'_blank',
			'noreferrer',
		);
	};

	const functions = {
		handleAirline: (singleItem) => (
			<div className={styles.tooltip_container}>
				<Tooltip
					content={singleItem?.airline?.business_name}
					placement="top"
					interactive
				>
					<div className={styles.airline_name}>
						{singleItem?.airline?.logo_url ? (
							<img
								src={singleItem?.airline?.logo_url}
								alt=""
								style={{ maxWidth: '20px', marginRight: '8px' }}
							/>
						) : (
							<IcMAirport
								width={18}
								height={16}
								fill="#888888"
								style={{ marginRight: '8px' }}
							/>
						)}
						{singleItem?.airline?.business_name}

					</div>
				</Tooltip>
			</div>
		),
		handleAirport: (singleItem) => (
			`(${singleItem?.airport?.port_code}) ${singleItem?.airport?.name}`
		),
		handleDestLocation: (singleItem) => (
			singleItem?.destination_location?.name
			&& singleItem?.destination_location?.name
		),
		handleIE: (singleItem) => (
			singleItem?.importer_exporter?.business_name
				&& singleItem?.importer_exporter?.business_name
		),
		handleAgent: (singleItem) => (
			singleItem?.procured_by?.name
		),
		handleIATACode: (singleItem) => (
			singleItem?.procured_by?.name
		),
		handleServiceProvider: (singleItem) => (
			singleItem?.service_provider?.business_name
		),
		handleShipments: (singleItem) => {
			const { shipments = [] } = singleItem;

			const handleClick = () => {
				if (shipments[ZEROTH_INDEX]?.id) {
					redirectToShipment(shipments[ZEROTH_INDEX].id);
				}
			};
			return (
				<div>
					<Button
						themeType="linkUi"
						onClick={handleClick}
					>
						{shipments[ZEROTH_INDEX]?.serial_id || '-'}
					</Button>
				</div>
			);
		},
		handleDate: (singleItem) => (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : singleItem.procured_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
					separator  : ' ',
				})}
			</div>
		),
	};
	return (
		<div className={styles.awbnumber_container}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
			/>
		</div>
	);
}
export default AwbNumberUsed;
