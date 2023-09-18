import styled from '@cogoport/front/styled';

export const Loader = styled.div`
	position: relative;
`;

export const MapUnable = styled.marquee`
	color: #333;
	font-weight: 500;
	font-size: 16px;
	top: -23px;
	position: absolute;
	z-index: 400;
`;

export const Container = styled.div`
	.leaflet-container {
		cursor: default !important;
		background-color: #fff !important;
		border: none !important;
	}
`;
