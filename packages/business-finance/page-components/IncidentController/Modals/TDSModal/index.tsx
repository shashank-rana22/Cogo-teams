import { Textarea, Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetTdsData from '../../apisModal/useGetTdsData';
import ApproveAndReject from '../../common/ApproveAndRejectData';

import styles from './styles.module.css';

function TDSModal({ tdsData, id, refetch, row, isEditable = true }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const [remark, setRemark] = useState('');
	const { data = {} } = row || {};
	const { organization = '' } = data || {};

	const tdsTradePartyName = data?.tdsRequest && organization?.tradePartyType;
	const {
		currentTdsRate, requestedTdsRate,
		validFrom, validTo, documentUrls, currentTdsStyle, requestedTdsStyle,
	} = tdsData;

	const toTitleCase = (str:string) => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		return titleCase;
	};
	const getRatePercentageData = [
		{ label: 'Current Rate', value: currentTdsRate },
		{ label: 'Requested Rate', value: requestedTdsRate },
	];
	const getAllValidData = [
		{ id: '1', label: 'Valid From', value: validFrom },
		{ id: '2', label: 'Valid Till', value: validTo },
		{ id: '3', label: 'Current TDS style', value: currentTdsStyle },
		{ id: '4', label: 'New TDS style Requested ', value: requestedTdsStyle },
	];
	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setShowTdsModal,
		id,
		row,
		remark,
	});
	const onApprove = () => {
		OnAction('APPROVED');
	};
	const onReject = () => {
		OnAction('REJECTED');
	};

	return (
		<div>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px', width: '70px', fontWeight: '600' }}
					themeType="secondary"
					onClick={() => {
						setShowTdsModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showTdsModal && (
				<Modal
					size="lg"
					show={showTdsModal}
					onClose={() => {
						setShowTdsModal(false);
					}}
				>
					<Modal.Header title="TDS Deviation" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.flex}>
							<div className={styles.org_name}>Organization Name - </div>
							<div className={styles.name}>
								{tdsTradePartyName ? (
									<div>
										{organization?.tradePartyName || '-'
										|| toTitleCase(organization?.businessName) || '-'}

									</div>
								) : (
									<div>{toTitleCase(organization?.businessName) || '-'}</div>
								)}
							</div>
						</div>
						<div className={styles.flex}>
							{getRatePercentageData.map((itemData) => (
								<div className={styles.rates_data}>
									<div className={styles.rates}>
										{itemData?.value || '-'}
										%
									</div>
									<div className={styles.label}>{itemData?.label || '-'}</div>
								</div>
							))}
						</div>
						<div className={styles.flex}>
							{getAllValidData.map((item) => (
								<div className={styles.value_data}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>
										{(item?.id === '1' || item?.id === '2')
											? item?.value || '-'
											: startCase(item?.value) || '-'}

									</div>
								</div>
							))}
						</div>
						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									{url.split('/')[4] || '-'}
								</a>
							) : (
								<div> No document available</div>
							)))}
						</div>
						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>

								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
									onChange={(value: string) => setRemark(value)}
									style={{ width: '700', height: '100px', marginBottom: '12px' }}
								/>
							</>
						) }

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									onClick={() => {
										onReject();
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									onClick={() => {
										onApprove();
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default TDSModal;
