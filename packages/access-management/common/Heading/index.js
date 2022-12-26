import React from 'react';
import { Container, Title, SubTitle } from './styles';

const Heading = ({ title = '', subTitle = '' }) => (
	<Container className="heading-container">
		<Title className="title">{title}</Title>
		<SubTitle className="sub-title">{subTitle}</SubTitle>
	</Container>
);

export default Heading;
