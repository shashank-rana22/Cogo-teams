import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #e0e0e0;
	min-height: calc(100vh - 90px);
`;

export const LoadingContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const GridContainer = styled.div`
	transition: transform 0.2s;
	background: #fff;
	height: 100%;
	width: 100%;
	position: relative;

	&.z-1 {
		z-index: 1;
	}

	&.z-10{
		z-index: 10;
	}
	
`;

export const CloseContainer = styled.div`
	position: absolute;
	float: right;
	cursor: pointer;
	right: -8px;
	top: -8px;
	width: 25px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	border: 1px solid #bdbdbd;
	border-radius: 100%;
	z-index: 111;
`;

export const NoWidgetsText = styled.div`
	display: flex;
	width: 100%;	
	height: calc(100vh - 100px);
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
