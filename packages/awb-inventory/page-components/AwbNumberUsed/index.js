import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { AwbNumberUsedFields } from '../../configurations/awb-number-used-fields';

import styles from './styles.module.css';

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

	const otherFunctions = {
		handleShipments: (singleItem) => {
			const { shipments = [] } = singleItem;

			const handleClick = () => {
				if (shipments[GLOBAL_CONSTANTS.zeroth_index]?.id) {
					redirectToShipment(shipments[GLOBAL_CONSTANTS.zeroth_index].id);
				}
			};
			return (
				<div>
					<Button
						themeType="linkUi"
						onClick={handleClick}
					>
						{shipments[GLOBAL_CONSTANTS.zeroth_index]?.serial_id || '-'}
					</Button>
				</div>
			);
		},
	};

	const allFunctions = { ...functions, ...otherFunctions };

	return (
		<div className={styles.awbnumber_container}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={allFunctions}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
			/>
		</div>
	);
}
export default AwbNumberUsed;
