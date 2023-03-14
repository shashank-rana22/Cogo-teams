import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import documentType from './documentType';
import {
	Ontrack,
	TitleContainer,
	RollOver,
	BlNumber,
	Details,
	DisplayCard,
	Container,
	DocumentType,
	CaretBox,
} from './styles';

function TitleCard({
	item = {},
	setOpen = () => {},
	open = false,
	setActiveId = () => {},
	activeId = '',
	shipment_data = {},
}) {
	const { doc_type } = documentType(item?.bl_document_type);

	const handleClick = (id) => {
		if (open && activeId === id) {
			setOpen(false);
			setActiveId('');
		} else {
			setOpen(true);
			setActiveId(id);
		}
	};

	return (
		<Container className="title-card">
			<DisplayCard>
				{shipment_data?.shipment_type === 'fcl_freight' ? (
					<Details>
						<TitleContainer>
							<DocumentType>
								{doc_type}
								{' '}
								{startCase(item?.status)}
								{' '}
								:
							</DocumentType>

							<Ontrack>
								{`${startCase(item?.containers_count || 0)} ${
									item?.containers_count === 1 ? 'Container' : 'Containers'
								} on track`}
							</Ontrack>

							{item?.containers_rolled_over ? (
								<RollOver>
									,
									{' '}
									{startCase(item?.containers_rolled_over)}
									{' '}
									rolled over
								</RollOver>
							) : null}
						</TitleContainer>
					</Details>
				) : null}

				<BlNumber>
					{shipment_data?.shipment_type === 'air_freight' ? (
						<>AWB Number</>
					) : (
						<>BL Number</>
					)}
					:
					{' '}
					{item?.bl_number}
					{' '}
				</BlNumber>
			</DisplayCard>

			{!isEmpty(item?.container_details) ? (
				<CaretBox onClick={() => handleClick(item?.id)}>
					<IcMArrowRotateDown />
				</CaretBox>
			) : (
				<div style={{ marginRight: '50px' }} />
			)}
		</Container>
	);
}

export default TitleCard;
