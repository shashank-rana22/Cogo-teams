import React, { useState } from 'react';
import Button from '@cogoport/front/components/admin/Button';
import FormLayout from '../../../../../../commons/Layout';
import {
	Container,
	ButtonDiv,
	SkeletonWrapper,
	CustomSkeleton,
} from './styles';

import ConfirmModal from './ConfirmModal';

const UpdateQuotation = ({
	editQuote = {},
	onCancel = () => {},
	reallocationFunc = () => {},
	airInput = {},
	localAirInput = () => {},
	shipmentData = {},
	watchServiceProvider = {},
	formattedRate,
	fieldsForLocal,
}) => {
	const {
		controls,
		fields,
		loading,
		customValues,
		handleSubmit,
		onCreate,
		confirmLoading,
	} = editQuote || {};

	const [confirmModal, setConfirmModal] = useState(false);

	const handleFinalSubmit = async () => {
		if (shipmentData?.shipment_type === 'air_freight') {
			setConfirmModal(true);
		} else {
			handleSubmit(onCreate)();
			reallocationFunc();
		}
	};

	return loading ? (
		<SkeletonWrapper>
			{Array(5)
				.fill(0)
				.map(() => (
					<CustomSkeleton />
				))}
		</SkeletonWrapper>
	) : (
		<Container>
			<FormLayout
				controls={controls}
				fields={fields}
				errors={{}}
				customValues={customValues}
			/>

			<ButtonDiv>
				<Button
					className="secondary md"
					style={{ marginRight: 10 }}
					onClick={() => {
						onCancel();
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						handleFinalSubmit();
					}}
					disabled={confirmLoading}
				>
					Confirm
				</Button>
			</ButtonDiv>
			{confirmModal && (
				<ConfirmModal
					confirmModal={confirmModal}
					setConfirmModal={setConfirmModal}
					airInput={airInput}
					localAirInput={localAirInput}
					handleSubmit={handleSubmit}
					onCreate={onCreate}
					fieldsForLocal={fieldsForLocal}
					formattedRate={formattedRate}
					reallocationFunc={reallocationFunc}
					confirmLoading={confirmLoading}
					watchServiceProvider={watchServiceProvider}
				/>
			)}
		</Container>
	);
};

export default UpdateQuotation;
