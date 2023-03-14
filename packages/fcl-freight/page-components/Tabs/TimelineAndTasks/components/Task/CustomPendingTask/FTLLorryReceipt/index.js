import { useEffect } from 'react';
import { FullscreenModal } from '@cogo/commons/components';
import { Button, toast } from '@cogoport/front/components/admin';
import { Container, ButtonWrap } from './styles';
import ModalContent from './ModalContent';
import ChildFormat from './ChildFormat';
import useBulkUpdate from './hooks/useBulkUpdate';

import { useFieldArrayData } from './hooks/useFieldArrayData';

const FTLLorryReceipt = ({
	shipment_data,
	themeType = 'admin',
	showElements = {},
	id_prefix = null,
	customValues = {},
	onCancel = () => {},
	task,
	services,
	refetch = () => {},
}) => {
	const {
		show,
		id,
		setShow,
		setId,
		lrData,
		finalDoc,
		disabledButtons,
		data,
		getlrData,
		fields,
		handleSubmit,
		control,
		setValues,
		errors,
	} = useFieldArrayData({ services });

	useEffect(() => {
		const fetchData = async () => {
			await getlrData(shipment_data.id);
		};
		fetchData();
	}, []);
	const { handleBulkPayload, handlePendingTask } = useBulkUpdate();

	const submitTask = async (val) => {
		const response = await handleBulkPayload({ val, shipment_data });
		if (response?.status === 200) {
			const taskResponse = await handlePendingTask({ val, task });
			if (taskResponse?.status === 200) {
				toast.success('Task Completed Successfully');
				refetch();
				onCancel();
			}
		}
	};

	return (
		<Container>
			{control.map((controlItem) => {
				return (
					<ChildFormat
						{...controlItem}
						{...fields[controlItem.name]}
						error={errors[controlItem.name]}
						showElements={showElements[controlItem.name]}
						id_prefix={id_prefix}
						customValues={customValues[controlItem.name]}
						themeType={themeType}
						setShow={setShow}
						setId={setId}
						disabledButtons={disabledButtons}
					/>
				);
			})}

			<ButtonWrap>
				<Button
					onClick={() => onCancel()}
					className="secondary md"
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>
				<Button onClick={handleSubmit(submitTask)} className="primary md">
					Submit
				</Button>
			</ButtonWrap>
			<FullscreenModal
				heading="Auto Generate Lorry Receipt"
				show={show}
				setShow={setShow}
				id="remove-modal"
			>
				<ModalContent
					data={data}
					id={id}
					lrData={lrData}
					setValues={setValues}
					finalDoc={finalDoc}
					setShow={setShow}
				/>
			</FullscreenModal>
		</Container>
	);
};

export default FTLLorryReceipt;
