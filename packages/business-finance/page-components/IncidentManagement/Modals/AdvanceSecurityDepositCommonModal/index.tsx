import { Modal, Button, Textarea } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ApproveAndReject from '../../common/ApproveAndRejectData';

import styles from './styles.module.css';

interface DetailsInterface {
	title?:string,
	value?:any,

}
interface Props {
	securityDepositDetails?:DetailsInterface[],
	showDepositModal?: boolean,
	setShowDepositModal?:React.Dispatch<React.SetStateAction<boolean>>,
	isEditable?:boolean,
	row?:object,
	getData?:Function,
	loading?:boolean,
	setRemarkValue?:React.Dispatch<React.SetStateAction<string>>,
	type?:string,

}
function SecurityDepositCommonModal({
	securityDepositDetails,
	showDepositModal,
	setShowDepositModal,
	isEditable,
	row,
	getData,
	loading,
	setRemarkValue,
	type,
}:Props) {
	const { t } = useTranslation(['incidentManagement']);
	return (
		<Modal
			size="md"
			show={showDepositModal}
			onClose={() => {
				setShowDepositModal(false);
			}}
		>
			<Modal.Header title={type === 'SecurityDeposit'
				? t('incidentManagement:adv_cont_sec_deposit') : t('incidentManagement:adv_cont_sec_deposit_refund')}
			/>
			<Modal.Body>
				{!isEditable && <ApproveAndReject row={row} />}
				{securityDepositDetails.map((itm) => {
					const { title, value } = itm || {};
					return (
						<div key={title} className={styles.flex}>
							<div className={styles.title}>
								{title}
							</div>
							<div className={styles.divider}>
								:
							</div>
							<div className={styles.name}>
								<div>{value || ''}</div>
							</div>
						</div>
					);
				})}

				{isEditable && (
					<>
						<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>
						<Textarea
							name="remark"
							size="md"
							rows={4}
							cols={20}
							placeholder={t('incidentManagement:remarks_placeholder')}
							onChange={(e: string) => setRemarkValue(e)}
						/>
					</>
				)}
			</Modal.Body>
			{isEditable && (
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: '8px' }}
							disabled={loading}
							onClick={() => {
								getData({ status: 'REJECTED' });
							}}
						>
							{t('incidentManagement:reject_btn')}
						</Button>

						<Button
							size="md"
							style={{ marginRight: '8px' }}
							disabled={loading}
							onClick={() => {
								getData({ status: 'APPROVED' });
							}}
						>
							{t('incidentManagement:approve_btn')}
						</Button>
					</div>
				</Modal.Footer>
			)}
		</Modal>
	);
}

export default SecurityDepositCommonModal;
