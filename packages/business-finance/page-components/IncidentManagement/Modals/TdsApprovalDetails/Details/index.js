import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetTdsData from '../../../apisModal/useGetTdsData';
import STATUS_MAPPING from '../../../Constants/status_mapping';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [remark, setRemark] = useState('');
	const { status = '', id = '' } = row || {};

	const {
		currentTdsRate,
		requestedTdsRate,
	} = row?.data?.tdsRequest || {};

	const getRatePercentageData = [
		{ label: t('incidentManagement:current_tds_rate'), value: currentTdsRate },
		{ label: t('incidentManagement:requested_tds_rate'), value: requestedTdsRate },
	];
	const { useOnAction: OnAction, loading } = useGetTdsData({
		refetch,
		setDetailsModal,
		id,
		row,
		remark,
		t,
	});
	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>{row?.data?.organization?.businessName || ''}</div>
				</div>
				<div>
					<div className={styles.heading}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || ''}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.flex}>
				{getRatePercentageData.map((itemData) => (
					<div className={styles.rates_data} key={itemData?.label_text}>
						<div className={styles.rates}>
							{itemData?.value || '-'}
							%
						</div>
						<div className={styles.label}>{itemData?.label || '-'}</div>
					</div>
				))}
			</div>

			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
								${styles.required_field}`}
					>
						Remarks
					</div>

					<Textarea
						className={styles.textarea}
						name="remark"
						size="md"
						placeholder="Enter Remarks Here"
						onChange={(value) => setRemark(value)}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remark) || loading}
							loading={loading}
							onClick={() => OnAction(STATUS_MAPPING.rejected)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remark) || loading}
							loading={loading}
							onClick={() => { OnAction(STATUS_MAPPING.approved); }}
						>
							Approve
						</Button>
					</div>

				</div>
			) : null }

		</div>
	);
}

export default Details;
