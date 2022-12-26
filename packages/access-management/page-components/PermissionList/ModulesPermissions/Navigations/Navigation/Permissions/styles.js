import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-top: 16px;
`;

export const Feature = styled.div`
	background: #f2f2f2;
	border-radius: 4px;
	margin: 10px 0px;
	padding: 4px 10px;
	width: fit-content;
	display: flex;
	align-items: center;
	margin-bottom: 0px;
	border-radius: 4px 4px 0px 0px;
	position: absolute;
	top: -38px;
	border: 1px solid #b3d5fb;
	border-bottom: none;
	&.selected {
		background: #f5fafe;
	}
`;

export const FeatureHeading = styled.p`
	margin: 0px;
	font-size: 16px;
	font-weight: 500;
	line-height: 16px;
	text-align: center;
	letter-spacing: 0.02em;
	color: #000000;
	text-align: initial;
	margin-left: 10px;
`;

export const PermissionsContainer = styled.div`
	border: 1px solid #b3d5fb;
	padding: 10px;
	border-radius: 0px 10px 10px 10px;
	background: #f5fafe;
	margin-top: 36px;
	margin-bottom: 10px;
`;

export const RoleLogicGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&.show {
		padding-bottom: 16px;
	}
	.core-ui-radiogroup-container {
		display: flex;
		flex-direction: row;
	}

	.core-ui-radio-root {
		margin-right: 10px;
	}
`;

export const FeatureName = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
	&.normal {
		font-weight: normal;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	width: 45%;

	.core-ui-tooltip-root {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const GroupContainer = styled.div`
	background: #f9f9f9;
	border-radius: 8px;
	margin-bottom: 12px;
	padding: 16px 12px;
`;
