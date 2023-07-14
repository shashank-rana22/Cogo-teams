import { Button, Placeholder, Modal, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetTaggingBills from '../../../hook/useGetMappings';
import isDisabled from '../../../utils/isDisabled';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({
	billId,
	value, setValue, setRemarksVal, status,
}: {
	billId: string, status?: string, value?: { approve?: string, reject?: string, undo?: string, remark: string, },
	setValue: React.Dispatch<React.SetStateAction<{
		approve: string;
		reject: string;
		undo: string;
		remark:string
	}>>, setRemarksVal: React.Dispatch<React.SetStateAction<{
		collectionPartyRemark: string;
		billingPartyRemark: string;
		invoiceDetailsRemark: string;
		taggingRemark: string;
	}>>
}) {
	const [approve, setApprove] = useState(false);
	const { mappingsData, loading } = useGetTaggingBills({
		billId,
	});

	const classname = !isEmpty(mappingsData?.merge) ? 'merge' : '';

	const handleClickApprove = (label:string) => {
		setValue((prev) => ({ ...prev, approve: label, undo: 'undo' }));
	};

	const handleClickReject = () => {
		setApprove(true);
	};
	const handleSubmitReject = (label: string) => {
		setValue((prev) => ({ ...prev, reject: label, undo: 'undo' }));
		setRemarksVal((prev) => ({ ...prev, taggingRemark: value?.remark }));
		setApprove(false);
	};
	const handleClickUndo = () => {
		setValue((prev) => ({ ...prev, reject: '', approve: '' }));
		setRemarksVal((prev) => ({ ...prev, taggingRemark: '' }));
	};

	return (
		<>
			<div className={styles.border}>
				{!loading ? (
					<div className={`${styles.flex} 
					${styles.column} ${classname === 'merge' ? styles.merge : ''}`}
					>
						{!isEmpty(mappingsData)
							? (
								mappingsData?.merge || mappingsData?.split || []
							).map((item) => (
								<div className={`${styles.flex} ${styles.bordernone} ${styles.wrapper}`}>
									<TagCard
										item={item}
										classname={classname}
										isfirst
									/>
								</div>
							))
							: <div className={styles.empty}>No Taggings Found</div>}
					</div>
				) : <Placeholder width="100%" height="200px" />}
			</div>

			{!isEmpty(mappingsData) && isDisabled(status) && (
				<div>
					{value?.approve === 'approve' || value?.reject === 'reject' ? (
						<div
							className={styles.button_container}
							onClick={() => {
								handleClickUndo();
							}}
							role="presentation"
						>
							<Button size="md" themeType="secondary">
								Undo
							</Button>
						</div>
					) : (
						<div className={styles.button_container}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => {
									handleClickApprove('approve');
								}}
							>
								Approve
							</Button>
							<Button
								size="md"
								themeType="secondary"
								style={{ border: '1px solid #ed3726' }}
								onClick={() => {
									handleClickReject();
								}}
							>
								Reject
							</Button>
						</div>
					)}
				</div>
			)}
			{approve && (
				<Modal
					size="md"
					show={approve}
					onClose={() => {
						setApprove(false);
					}}
				>
					<Modal.Body>
						<div className={styles.heading}>
							Are you sure you want to
							{' '}
							Reject
							{' '}
							this Tagging ?
						</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							value={value?.remark}
							onChange={(val: string) => setValue((prev) => ({ ...prev, remark: val }))}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>
						<div className={styles.button}>
							<Button
								size="md"
								themeType="secondary"
								style={{ marginRight: '8px' }}
								onClick={() => {
									setApprove(false);
								}}
							>
								No
							</Button>
							<Button
								size="md"
								style={{ marginRight: '8px' }}
								disabled={!(value?.remark?.length > 0)}
								onClick={() => handleSubmitReject('reject')}
							>
								Yes
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>

	);
}

export default TagMap;
