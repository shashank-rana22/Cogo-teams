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
	font-size: 10px;
	color: #adadad;
	line-height: 16px;
	font-weight: normal;
	&.bold {
		font-size: 12px;
	}
`;

export const Divider = styled.div`
	height: 1px;
	margin-top: _s8;
	background-color: _grey.divider;

	&.childFormat {
		margin-bottom: _s8;
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
	&.center {
		align-items: center;
	}
`;

export const SpaceBetween = styled.div`
	&.row {
		layout: flex row space-between center;
		padding: 3px 6px;
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
	&.row.no-padding{
		padding: 3px 0px;
	}
`;

export const UploadContainer = styled.div`
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	text-transform: none;

	color: #000000;
	.blue {
		color: #034afd;
		margin-left: 2px;
	}
`;

export const SupportedFormat = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	/* identical to box height */
	text-transform: none;

	margin-top: 5px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;

	/* Gray 3 */

	color: #828282;
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
