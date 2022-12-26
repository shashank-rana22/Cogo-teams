import React from 'react';
import { Container, Heading, Content, IcContainer, Wrapper } from './styles';
import ICNonFunded from './ic-empty-non-funded.svg';

const EmptyState = ({ heading = 'data', placement = 'center' }) => (
	<Container>
		<Wrapper className={placement}>
			<Heading>No {heading} found</Heading>
			<Content>
				Looks like you do not have any {heading} in this category
			</Content>
		</Wrapper>
		{placement === 'center' ? (
			<IcContainer>
				<ICNonFunded height="100%" width="100%" style={{ marginLeft: 12 }} />
			</IcContainer>
		) : null}
	</Container>
);

export default EmptyState;
