import React from 'react';
import { SkeletonV1 } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

const customStyle = { height: '14px' };

const Loader = () => {
	return (
		<Container>
			<Details>
				<SkeletonV1 style={{ marginRight: '50px' }} />

				<Ports>
					<SkeletonV1 style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<SkeletonV1 style={customStyle} />
				</Ports>

				<Ports className="destination">
					<SkeletonV1 style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<SkeletonV1 style={customStyle} />
				</Ports>
			</Details>
		</Container>
	);
};

export default Loader;

const Container = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
`;

const Details = styled.div`
	background: #ffffff;
	width: 100%;
	padding: 10px 18px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const Ports = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 20px;

	&.destination {
		margin: 0 30px 0 60px;
	}
`;
