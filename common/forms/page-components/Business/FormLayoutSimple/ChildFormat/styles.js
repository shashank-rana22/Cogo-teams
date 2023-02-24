import styled from '@cogo/styled';

export const Container = styled.div`
	width: 100%;
	/* padding: _s4; */
	layout: flex column;
`;

export const ItemContainer = styled.div`
	width: 100%;
`;
export const ItemContainerWithButton = styled.div``;
export const Form = styled.form``;

export const Group = styled.div`
	width: 100%;
	padding: _s4;
	layout: flex column flex-start flex-start;
`;
export const Divider = styled.div`
	height: 1px;
	margin-bottom: 24px;
	background-color: _grey.divider;
`;

export const ButtonDiv = styled.div`
	layout: flex row flex-start;
	padding: 0px 28px;
`;

export const Label = styled.label`
	margin-bottom: _s2;
	display: inline-block;
	font-size: 14px;
	color: #333;
	line-height: 20px;
	font-weight: normal;
	&.bold {
		font-weight: bold;
		line-height: 1.43;
		margin-bottom: 0px;
	}

	&.row {
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 14px;
		/* identical to box height */
		margin-bottom: 0px;
		letter-spacing: 0.02em;
		color: #4f4f4f;
		max-width: 50%;
		&.bordered {
			padding: 0px 28px;
			max-width: 100%;
			margin-bottom: 10px;
		}
	}

	&.new {
		font-size: 12px;
		font-weight: 700;
		color: #4F4F4F;
	}
	&.big {
		font-weight: bold;
		font-size: 12px;
		color: #000000;
		margin-bottom: 8px;
		/* text-transform: uppercase; */
	}
`;

export const LowerLabel = styled.label`
	margin-top: _s2;
	display: inline-block;
	font-size: 14px;
	color: #adadad;
	line-height: 20px;
	font-weight: normal;
`;

export const ButtonDivFlexEnd = styled.div`
	layout: flex row flex-end;
`;
export const Heading = styled.div`
	font-size: 14px;
	font-weight: bold;
	line-height: 1.43;
	color: #333;
	margin-bottom: 16px;
	&.row {
		padding-left: 28px;
	}
`;

export const SpaceBetween = styled.div`
	&.row {
		layout: flex row space-between center;
		padding: 3px 28px;
		&:hover {
			background: #f2f2f2;
			&.error {
				background: #fef9f9;
				border: 1px solid #cb6464;
			}
		}
		&.error {
			background: #fef9f9;
			border: 1px solid #cb6464;
		}
	}
`;

export const Column = styled.div`
	layout: flex column;
	&.row {
		width: 50%;
	}
	&.aws {
		width: 100%;
	}
	&.nolabel {
		width: 100%;
	}
`;

export const Button = styled.button`
	border-radius: 4px;
	border: none;
	background: transparent;
	cursor: pointer;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 160%;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	padding: 0;
	margin-left:auto;
`;

export const RowNew = styled.div`
	display: flex;
	align-items: center;

	&.row {
		padding: 3px 28px;
	}
`;
