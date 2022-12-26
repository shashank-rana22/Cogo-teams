import React from 'react';
import { Container, Row, Col, Title } from './styles';

const ListHead = ({ columns = [] }) => (
	<Container>
		<Row>
			{columns?.map((column) => (
				<Col
					xs={12}
					sm={6}
					md={column.span}
					lg={column.span}
					key={column?.key || column?.label}
				>
					<Title>{column?.label}</Title>
				</Col>
			))}
		</Row>
	</Container>
);

export default ListHead;
