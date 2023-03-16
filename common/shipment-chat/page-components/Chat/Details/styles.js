import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 70%;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	background: #393f70;
	border-bottom: 2px solid #303b67;
	padding: 4px;
	min-height: 53px;

	.core_ui_port_conatiner {
		border-right: none !important;
	}

	.core_ui_loaction_name {
		color: #ffffff;
	}
	.core_ui_country_name {
		color: #ffffff;
	}
	.core_ui_port_code {
		color: #ffffff;
	}
	.core_ui_icon {
		path {
			fill: #ffffff;
		}
	}
	.core-ui-button-root {
		padding: 0px;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding-left: 40px;

		.bar-icon {
			position: absolute;
			top: 20px;
			left: 10px;
			fill: #fff;
			cursor: pointer;
		}
		.mobile-port-details {
			padding: 8px 0px;
			width: 70%;
		}
		.mobile-popOver-container {
			padding: 0 10px 0 0;
		}
		.core_ui_port_conatiner {
			width: 90%;
		}
	}
`;

export const SerialId = styled.div`
	font-size: 12px;
	color: #ffffff;
	display: flex;
	align-items: center;
	white-space: nowrap;
	border-right: 1px solid #ffffff;
	padding: 0px 8px;
	text-decoration-line: underline;
	cursor: pointer;

	@media (max-width: 768px) {
		display: flex;
		width: 100%;
		height: fit-content;
		padding: 0;
		border: none;
	}
`;

export const ChatSections = styled.div`
	background: #f9f9f9;
	border-radius: 0px 8px 8px 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100% - 53px);

	@media (max-width: 768px) {
		height: calc(100% - 87px);
		.stakeholders .core-ui-input-root {
			width: 200px;
		}
	}
`;

export const TypingContainer = styled.div`
	display: flex;
	align-items: center;
	background: #f6f5fe;

	.ui-textarea-root {
		background: #f6f5fe !important;
		border: none !important;
		padding: 12px 0px !important;

		.ui-textarea {
			border: none !important;
			resize: none !important;
			outline: none !important;
		}

		&:focus-within {
			box-shadow: none !important;
		}

		&:hover {
			border: none !important;
		}
	}

	.primary.text {
		color: black !important;
		font-weight: 400 !important;
		text-transform: none !important;
		padding: 4px !important;
		:hover {
			background: #e0e0e0 !important;
		}
	}

	.file-upload-progress-root {
		display: none !important;
	}

	.core-ui-button-root {
		border: none;
		background-color: #f6f5fe;
		padding: 8px;
		cursor: 'pointer';
	}
`;

export const IconWrap = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin: 0px 8px;
`;

export const AttachedDoc = styled.div`
	display: flex;
	align-items: center;
	background: #e0e0e0;
	padding: 4px 8px;
	border-radius: 4px;
	width: fit-content;
	white-space: nowrap;
	margin-right: 4px;
`;

export const AttachedContainer = styled.div`
	display: flex;
	max-width: 300px;
	overflow-x: auto;
`;

export const Name = styled.span`
	display: flex;
	align-items: center;
	color: #ffffff;
	margin-left: 12px;
	font-weight: 500;
`;

export const ChatUsers = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.div {
		border-bottom: 1px solid #393f70;
	}
`;

export const UserName = styled.div`
	font-weight: 400;
	font-size: 12px;
	padding: 2px;
	color: #828282;
	&.hide {
		display: none;
	}
	&:hover {
		color: #356efd;
	}
`;

export const Iconwrap = styled.div`
	cursor: pointer;

	&.left {
		display: none;
	}
`;

export const PopoverContainer = styled.div`
	width: 20%;

	@media (max-width: 768px) {
		display: flex;
		justify-content: flex-end;
		width: 100%;

		&.popOver-container {
			padding-right: 8px;
		}
	}
`;

export const Send = styled.div`
	cursor: pointer;
	padding-right: 10px;

	&.loading {
		opacity: 0.4;
		cursor: default;
	}
`;
