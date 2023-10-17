import { Button, Modal, Textarea, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import isDisabled from '../../../utils/isDisabled';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({
	value = { remark: '' },
	setValue = () => {},
	setRemarksVal = () => {},
	status = '',
	mappingsData = {},
	switchDetails = () => {},
	taggingChecked = false,
	setCheckItem = () => {},
}) {
	const [approve, setApprove] = useState(false);

	const classname = !isEmpty(mappingsData?.merge) ? 'merge' : '';

	const handleClickApprove = (label) => {
		setValue((prev) => ({ ...prev, approve: label, undo: 'undo' }));
	};

	const handleClickReject = () => {
		setApprove(true);
	};
	const handleSubmitReject = (label) => {
		setValue((prev) => ({ ...prev, reject: label, undo: 'undo' }));
		setRemarksVal((prev) => ({ ...prev, taggingRemark: [value?.remark] }));
		setApprove(false);
	};
	const handleClickUndo = () => {
		setValue((prev) => ({ ...prev, reject: '', approve: '' }));
		setRemarksVal((prev) => ({ ...prev, taggingRemark: [''] }));
		setCheckItem((prev) => ({ ...prev, taggingCheck: false }));
	};

	return (
		<>
			<div className={styles.border}>
				<div className={cl`${styles.flex} 
					${styles.column} ${classname === 'merge' ? styles.merge : ''}`}
				>
					{!isEmpty(mappingsData)
						? (
							mappingsData?.merge || mappingsData?.split || []
						).map((item) => (
							<div
								key={item?.id}
								className={cl`${styles.flex} ${styles.bordernone} ${styles.wrapper}`}
							>
								<TagCard
									item={item}
									classname={classname}
									isfirst
								/>
							</div>
						))
						: <div className={styles.empty}>No Taggings Found</div>}
				</div>
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
								disabled={taggingChecked}
								onClick={() => {
									handleClickApprove('approve');
									switchDetails();
								}}
							>
								Approve
							</Button>
							<Button
								size="md"
								themeType="secondary"
								disabled={taggingChecked}
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
							onChange={(val) => setValue((prev) => ({ ...prev, remark: val }))}
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
								disabled={isEmpty(value?.remark)}
								onClick={() => {
									handleSubmitReject('reject');
									switchDetails();
								}}
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