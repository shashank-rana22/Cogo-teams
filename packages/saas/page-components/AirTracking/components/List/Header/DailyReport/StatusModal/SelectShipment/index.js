import { Placeholder, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import getShipmentConfig from '../../../../../../configuration/shipmentConfig';
import { getTableFn } from '../../../../../../configuration/shipmentTableConfig';
import useDsrToSubscription from '../../../../../../hooks/useDsrToSubscription';
import useGetShipment from '../../../../../../hooks/useGetShipment';
import getLoadingArr from '../../../../../../utils/getLoadingArr';

import styles from './styles.module.css';

import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

const LOADING_ARR = getLoadingArr(4);

function SelectShipment({ selectedContact = {}, setIsSingleReport, setActiveStepper }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const shipmentConfig = getShipmentConfig({ t });

	const [selectedShipments, setSelectedShipments] = useState([]);

	const { id: contactId, dsrId } = selectedContact || {};

	const { loading: listLoading, associatedShipments = [], otherShipments = [] } = useGetShipment({ contactId });

	const {
		createLoading, getListLoading, submitHandler,
	} = useDsrToSubscription({ dsrId, setActiveStepper, selectedShipments, setSelectedShipments });

	const TABLE_MAPPING = useMemo(() => (
		getTableFn({ associatedShipments, otherShipments, t })
	), [associatedShipments, otherShipments, t]);

	const checkboxChangeHandler = ({ id, val }) => {
		if (val) {
			setSelectedShipments((prev) => [...prev, id]);
			return;
		}
		const filteredArr = selectedShipments.filter((ele) => ele !== id);
		setSelectedShipments(filteredArr);
	};

	return (
		<div className={styles.container}>
			{(getListLoading || listLoading) ? LOADING_ARR.map((ele) => (
				<Placeholder key={ele} height="30px" margin="0px 0px 15px 0px" />
			))
				: TABLE_MAPPING.map((info) => {
					const { name, title, filteredList = [], maxHeight, emptyStateText } = info || {};
					return (
						filteredList.length > 0 ? (
							<Table
								key={name}
								title={title}
								filteredList={filteredList}
								configs={shipmentConfig}
								loading={getListLoading || listLoading}
								itmFunction={{ selectedShipments, checkboxChangeHandler, loading: createLoading }}
								showPagination={false}
								isClickable={false}
								maxHeight={maxHeight}
								isScroll
							/>
						)
							: (
								<div key={name} className={styles.empty_state}>
									<p className={styles.title}>{title}</p>
									<div>{emptyStateText}</div>
								</div>
							)
					);
				})}

			<div className={styles.footer}>
				<Button
					themeType="secondary"
					onClick={() => setIsSingleReport(false)}
					disabled={createLoading}
				>
					{t('airOceanTracking:back_button_label')}
				</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					onClick={submitHandler}
					loading={createLoading}
				>
					{t('airOceanTracking:tracking_daily_report_next_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default SelectShipment;
