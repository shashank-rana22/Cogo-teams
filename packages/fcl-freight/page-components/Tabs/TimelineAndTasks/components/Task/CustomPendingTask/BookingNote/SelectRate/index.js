import React from 'react';
import Skeleton from '@cogoport/front/components/admin/Skeleton';
import { Container, SelectionDiv, SkeletonWrap } from './styles';
import Card from './Card';
import SelectForNewBn from './SelectForNewBn';

const SelectRate = ({
	step1HookData,
	setStep,
	setFileUrl,
	jumpStep1,
	services,
	selectedRate,
	source = '',
}) => {
	const {
		list,
		setSelectedCard,
		fields,
		Select,
		loading,
		updateConfirmation,
		handleSubmit,
	} = step1HookData;

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
				) : (
					(list || []).map((item) => {
						return (
							<Card
								selectedRate={selectedRate}
								item={item}
								priority={item.priority}
								setStep={setStep}
								setSelectedCard={setSelectedCard}
								setFileUrl={setFileUrl}
								jumpStep1={jumpStep1}
								updateConfirmation={updateConfirmation}
							/>
						);
					})
				)}
				<SelectForNewBn
					setStep={setStep}
					fields={fields}
					Select={Select}
					jumpStep1={jumpStep1}
					services={services}
					handleSubmit={handleSubmit}
					source={source}
				/>
			</SelectionDiv>
		</Container>
	);
};

export default SelectRate;
