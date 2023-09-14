import { Placeholder, cl } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import getMappingObject from '../../../../constant/card';

import styles from './styles.module.css';

function ShipmentInfo({ activeTab, loading, shipmentInfo = {}, airCargoDetails = {} }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const GET_MAPPING = getMappingObject({ t });

	const MAPPING = GET_MAPPING?.[activeTab];

	const { SHIPMENT_TITLE, SHIPMENT_INFO, LOADING_ICON } = MAPPING;

	const tableData = useMemo(() => {
		const { commodity = '', hs_code = '' } = shipmentInfo || {};
		return {
			commodity : hs_code ? `${commodity} - (${hs_code})` : <IcMAlert />,
			weight    : airCargoDetails?.weight,
			piece     : airCargoDetails?.piece,
		};
	}, [shipmentInfo, airCargoDetails]);

	if (loading) {
		return (
			<div className={styles.skeleton_loader}>
				<Placeholder height="182px">
					{LOADING_ICON}
				</Placeholder>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{SHIPMENT_TITLE}</h3>

			<div className={styles.line} />

			<div className={styles.info_container}>
				<div className={styles.info_table}>
					{Object.keys(SHIPMENT_INFO).map((item) => (
						<div key={item} className={cl`${styles.flex_box} ${styles.row}`}>

							<div className={cl`${styles.label} ${styles.col}`}>
								{SHIPMENT_INFO[item]}
							</div>

							<div className={styles.col}>
								:
							</div>

							<div className={cl`${styles.value} ${styles.col}`}>
								{tableData?.[item]}
							</div>
						</div>
					))}

				</div>
			</div>

		</div>
	);
}

export default ShipmentInfo;
