import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useGetShipment from '../../../../../../hooks/useGetShipment';
import { RENDER_VALUE_MAPPING } from '../../../../../../utils/detailsHelperFuncs';

import { handleCopyData, DATA_TO_SHOW } from './handleCopyData';
import styles from './styles.module.css';

function ShipmentInfoDetail({
	shipmentId = '',
	shipmentPopover = {},
	id = '',
}) {
	const {
		loading = false,
		data = {},
	} = useGetShipment({ shipmentId, shipmentPopover, id });

	const { primary_service_detail = {}, summary = {} } = data || {};

	const { serial_id = '' } = summary || {};

	if (loading) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					width={50}
					height={50}
					alt="loader"
				/>
			</div>
		);
	}

	if (isEmpty(primary_service_detail)) {
		return <div className={styles.loader}>No Data...</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => handleCopyData({ serialId: serial_id, details: primary_service_detail })}
				>
					<IcMCopy />
					Copy
				</Button>
			</div>

			{serial_id ? (
				<div className={styles.each_content}>
					Serial ID:
					<span>{serial_id}</span>
				</div>
			) : null}

			{Object.entries(DATA_TO_SHOW)?.map(
				([key, label]) => {
					const displayValue = RENDER_VALUE_MAPPING?.[key]?.(primary_service_detail, true);

					if (!displayValue) {
						return null;
					}

					return (
						<div
							key={key}
							className={styles.each_content}
						>
							{label}
							:
							<span>{displayValue}</span>
						</div>
					);
				},
			)}
		</div>
	);
}

export default ShipmentInfoDetail;
