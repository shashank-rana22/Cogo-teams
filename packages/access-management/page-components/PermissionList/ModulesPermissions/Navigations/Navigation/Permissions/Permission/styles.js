import styled from '@cogoport/front/styled';

export const Label = styled.p`
	font-size: 14px;
	line-height: 16px;
	letter-spacing: -0.02em;
	display: block;
	min-width: 150px;
	width: 150px;
	color: #333333;
	margin: 0px;

	&.option {
		font-weight: normal;
		margin-bottom: 8px;
		width: 100%;
		min-width: auto;
		margin-right: 0px;
		font-size: 10px;
		line-height: 12px;
		color: #333333;
	}

	&.no-option {
		width: 80%;
		margin-bottom: 0px;
		margin-right: 0px;
		margin-left: 8px;
		min-width: auto;
	}
`;

export const SpaceBetween = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	&.error {
		background: #fef9f9;
		border: 1px solid #cb6464;
		padding: 2px 6px;
	}
`;

export const Container = styled.div`
	padding-bottom: 16px;
	margin-bottom: 12px;
	display: flex;
	align-items: flex-start;
	margin-left: 12px;
`;

export const OptionsContainer = styled.div`
	margin: 0px 18px 20px 0px;
	min-width: 100px;
	display: flex;
	align-items: center;

	&.options {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const ErrorNew = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	/* identical to box height */

	display: flex;
	align-items: center;
	letter-spacing: 0.02em;

	/* Red 1 */

	color: #cb6464;
	margin-left: 28px;
`;
