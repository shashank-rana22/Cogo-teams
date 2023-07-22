import { Button, Toast, cl } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import styles from './styles.module.css';

const STYLE_ICON = {
	marginLeft : 4,
	height     : 20,
	width      : 20,
};

const HBL = ['house_bill_of_lading', 'draft_house_bill_of_lading'];

function MarkIgmShipmentConfirm({
	task = {},
	taskConfigData = {},
	taskListRefetch = () => {},
	tasksList = [],
	onCancel = () => {},
}) {
	const { apiTrigger, loading: taskUpdateLoading } = useUpdateShipmentPendingTask({
		refetch: () => {
			onCancel();
			taskListRefetch();
		},
		task,
		tasksList,
	});

	const handleSubmit = async () => {
		const payload = {
			id: task?.id,
		};

		await apiTrigger(payload);
	};

	const handleCopy = async (val) => {
		navigator.clipboard
			.writeText(val)
			.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
	};

	const getBLContainerDetails = (blType, blNumber) => (
		<div className={styles.bl_container}>
			<div className={styles.document_type}>
				{blType}
				:
				{' '}
			</div>
			<div className={cl`${styles.bl_container} ${styles.bl_details}`}>
				<div className={styles.bl_number}>{blNumber ?? 'NA'}</div>
				<IcMCopy
					onClick={() => handleCopy(blNumber)}
					style={STYLE_ICON}
				/>
			</div>
		</div>
	);

	const list = taskConfigData?.apis_data?.list_shipment_bl_details;

	return (
		<>
			<div>
				{isEmpty(list)
					? <span className={styles.bl_not_uploaded}>BL is not uploaded yet!!</span>
					:			(
						<div>
							{
				(list || []).map((item) => {
					if (HBL.includes(item?.bl_document_type)) {
						return <span key={item?.id}>{getBLContainerDetails('HBL Number', item?.bl_number)}</span>;
					}
					return <span key={item?.id}>{getBLContainerDetails('MBL Number', item?.bl_number)}</span>;
				})
			}
						</div>
					)}

			</div>
			<div className={styles.btn_div}>
				<Button
					themeType="secondary"
					className={styles.button}
					onClick={onCancel}
				>
					Cancel
				</Button>

				<Button
					disabled={taskUpdateLoading || isEmpty(list)}
					onClick={handleSubmit}
				>
					Confirm
				</Button>
			</div>
		</>
	);
}

export default MarkIgmShipmentConfirm;
