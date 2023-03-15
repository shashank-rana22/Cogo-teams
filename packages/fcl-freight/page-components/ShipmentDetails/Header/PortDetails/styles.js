import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	width: 60%;
	padding: 0px 20px;
	border-right: 1px solid #e0e0e0;

	@media (max-width: 1260px) {
		width: 56%;
	}

	@media (max-width: 768px) {
		padding: 0 15px 0 0;
	}
`;

export const FlexRowOrigin = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
`;

export const FlexRowDest = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
`;

export const Value = styled.div`
	font-size: 12px;
	font-weight: 700;
	font-size: 12px;
	color: #333333;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 80%;
	cursor: pointer;

	&.isSingle {
		width: 100%;
		cursor: default;
	}
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 15%;
	margin: 0 12px;
`;

export const PortCode = styled.div`
	display: flex;
	align-items: center;
	line-height: 16px;
`;

export const Code = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 10px;
	color: #828282;
	margin-right: 4px;
`;

export const Country = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 10px;
	color: #828282;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const ServiceName = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 12px;
	color: #5936f0;
	margin-top: 4px;
`;

export const IconAndService = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20px;
`;

export const Icd = styled.div`
	font-size: 10px;
	font-weight: 700;
	margin: 4px 0;
`;
