import { Grid1 } from '@cogo/deprecated_legacy/ui';
import styled from '@cogo/styled';

const { Row: GridRow, Col: GridCol } = Grid1;

export const Row = styled(GridRow)`
	.custom-select-input-select-value {
		font-size: 14px;
		color: #000000;
		line-height: 20px;
	}

	.custom-select-input-subcontainer {
		height: 48px;
		border: solid 1px #e0e0e0;
		cursor: text;
		box-shadow: none;
		:focus {
			border: 1px solid black;
			box-shadow: none;
		}
		:focus-within {
			border: 1px solid black;
			box-shadow: none;
		}
		:hover {
			border: 1px solid black;
			box-shadow: none;
		}

		.size-md {
			height: 44px !important;
		}

		.core-ui-input-root {
			border: none;
			padding: 0px;
		}
		&.multiple {
			height: auto;
		}
	}
	&.new-isolated {
		.ui-input-group {
			height: 32px;
			border: 1px solid #e0e0e0;
		}

		.ui-input {
			&::placeholder {
				color: #828282;
			}
			font-size: 12px;
		}

		.select__control {
			min-height: 32px;
			font-size: 12px;
			border: 1px solid #e0e0e0;
		}

		.select__placeholder {
			line-height: 1.4;
			font-size: 12px;
		}

		textarea {
			padding-left: 12px;
			padding-right: 12px;
			font-size: 12px;
			resize: none;
			line-height: 14px;
		}

		.ui-form-error-text {
			font-size: 12px;
			line-height: 18px;
		}

		.custom-select-input-select-value {
			font-size: 12px;
			line-height: 18px;
		}

		.custom-select-input-subcontainer {
			height: 34px;

			.size-md {
				height: 30px !important;
			}

			.core-ui-input-root {
				border: none;
				padding: 0px;
			}
			&.multiple {
				height: auto;
			}
		}
		.custom-select-input-chip {
			padding: 0px 6px;
		}
		.custom-select-input-chip-button {
			height: 20px;
			width: 20px;
		}
		.custom-select-input-chip-icon {
			height: 20px;
			width: 20px;
		}
	}

	&.new {
		.custom-select-input-select-value {
			font-size: 12px;
			line-height: 18px;
		}

		.custom-select-input-subcontainer {
			height: 34px;

			.size-md {
				height: 30px !important;
			}

			.core-ui-input-root {
				border: none;
				padding: 0px;
			}
			&.multiple {
				height: auto;
			}
		}
		.custom-select-input-chip {
			padding: 0px 6px;
		}
		.custom-select-input-chip-button {
			height: 20px;
			width: 20px;
		}
		.custom-select-input-chip-icon {
			height: 20px;
			width: 20px;
		}
	}

	&.big {
		.custom-select-input-select-value {
			font-size: 12px;
			line-height: 18px;
		}

		.custom-select-input-subcontainer {
			height: 44px;

			.size-md {
				height: 40px !important;
			}

			.core-ui-input-root {
				border: none;
				padding: 0px;
			}
			&.multiple {
				height: auto;
			}
		}
	}
`;

export const Col = styled(GridCol)`
	&.new-isolated {
		&.error {
			.select__control {
				border-color: #de350b;
			}
		}
	}
`;
