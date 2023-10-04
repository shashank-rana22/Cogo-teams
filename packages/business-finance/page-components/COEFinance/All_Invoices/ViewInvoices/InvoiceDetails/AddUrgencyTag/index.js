import { Select, Button, Textarea, Modal } from '@cogoport/components';

import updateTag from '../../../../hook/useUpdateTag';
import { urgencyOptions } from '../controls';

import styles from './styles.module.css';

interface AddUrgencyTagInterface {
	billId?: string;
	remark?: string;
	showAddTag?: boolean;
	serviceType?: string;
	tagValue?: string;
	getBillRefetch?: () => void;
	setShowAddTag: React.Dispatch<React.SetStateAction<boolean>>;
	setTagValue: React.Dispatch<React.SetStateAction<string>>;
	setRemark: React.Dispatch<React.SetStateAction<string>>;
}

function AddUrgencyTag({
	billId = '',
	showAddTag = false,
	serviceType = '',
	tagValue = '',
	setShowAddTag,
	remark,
	setRemark,
	setTagValue,
	getBillRefetch = () => {},
}: AddUrgencyTagInterface) {
	if (serviceType === 'air_freight') {
		urgencyOptions.push({ label: 'Airlines DO Payments', value: 'air_do' });
	}

	const onClose = () => {
		setShowAddTag(false);
		getBillRefetch();
	};

	const { loading, handleSubmit } = updateTag({
		onClose,
		billId,
		tagValue,
		remark,
	});

	return (
		<Modal show={showAddTag} onClose={onClose}>
			<div className={styles.sub_container}>
				<div className={styles.heading}>Urgency Tag</div>

				<Select
					className="primary lg"
					placeholder="Select the urgency Tag"
					value={tagValue}
					onChange={(e: any) => setTagValue(e)}
					options={urgencyOptions}
				/>

				{tagValue === 'urgent' ? (
					<Textarea
						value={remark}
						onChange={(e: any) => setRemark(e)}
						placeholder="Enter Urgent Remarks..."
					/>
				) : null}
			</div>

			<div className={styles.button_container}>
				<Button
					className={styles.cancelbtn}
					themeType="secondary"
					onClick={() => setShowAddTag(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button onClick={handleSubmit} disabled={loading}>
					Submit
				</Button>
			</div>
		</Modal>
	);
}

export default AddUrgencyTag;
