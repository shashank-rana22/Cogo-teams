import React, { useEffect } from 'react';
import Skeleton from '@cogoport/front/components/admin/Skeleton';
import { Container, SelectionDiv, SkeletonWrap } from './styles';
import Card from './Card';
import SelectNormal from './SelectNormal';
import useGetSuppier from '../../../../../../commons/Layout/SupplierSelect/useGetSupplier';

const SelectRate = ({
	setStep,
	setSelectedCard,
	updateConfirmation,
	task,
	source = '',
}) => {
	const { data, loading } = useGetSuppier({
		service_id: task.service_id,
		service_type: task.service_type,
	});

	const list = data?.list || [];

	const selected_priority = (list || []).find(
		(item) => item.priority === item.selected_priority,
	);

	const airFreightNormalBookingCondition =
		(list || []).length === 0 &&
		task?.shipment_type === 'air_freight' &&
		source === 'direct';

	useEffect(() => {
		if (selected_priority) {
			setSelectedCard(selected_priority);
			setStep(2);
		}
	}, [selected_priority]);

	return (
		<Container>
			<SelectionDiv>
				{loading ? (
					<SkeletonWrap>
						{Array(6)
							.fill(0)
							.map(() => {
								return (
									<Skeleton
										width="100%"
										height="20px"
										style={{ marginBottom: '10px' }}
									/>
								);
							})}
					</SkeletonWrap>
				) : null}
				{(list || []).map((item) => {
					return (
						<Card
							item={item}
							priority={item.priority}
							setStep={setStep}
							setSelectedCard={setSelectedCard}
							updateConfirmation={updateConfirmation}
						/>
					);
				})}
				<SelectNormal
					setStep={setStep}
					airFreightNormalBookingCondition={airFreightNormalBookingCondition}
				/>
			</SelectionDiv>
		</Container>
	);
};

export default SelectRate;
