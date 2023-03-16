import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 32%;
	position: relative;
	overflow: hidden;
	transition: all 0.3s;

	.ui-tabs-list {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		width: 0;
		position: absolute;

		&.show-menu {
			width: 240px;
			background-color: #fff;
			z-index: 2;
			height: 100%;
		}
	}
`;

export const SubContainer = styled.div`
	border-right: 1px solid #e0e0e0;

	@media (max-width: 768px) {
		height: calc(100% - 53px);
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	color: #ffffff;
	padding: 16px 4px 17px 24px;
`;

export const Search = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 12px 12px 20px;

	.core-ui-input-root {
		width: 180px !important;
	}
	@media (max-width: 768px) {
		padding-left: 10px;
	}
`;

export const ListContainer = styled.div`
	overflow: auto;
	background: #ffffff;
	height: 350px;

	.colored {
		background: #303b67;
	}

	@media (max-width: 768px) {
		height: 100%;
	}
`;

export const MenuCloseBtn = styled.div`
	border-radius: 50%;
	position: absolute;
	top: 15px;
	right: 5px;
	fill: #fff;
	cursor: pointer;
	.core-ui-button-root {
		padding: 8px 0;
	}
`;

export const Card = styled.div`
	padding: 12px 24px;
	border-bottom: 1px solid #e0e0e0;
	align-items: center;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	:hover {
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
	}
	.colored {
		color: #ffffff;
	}
`;

export const SerialId = styled.div`
	font-size: 14px;
	font-weight: 500;
	color: #393f70;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		display: flex;
		width: 100%;
		height: fit-content;
		border: none;
	}
`;

export const UpdatedAt = styled.div`
	font-weight: 400;
	font-size: 10px;
	color: #333333;
`;

export const Circle = styled.div`
	border-radius: 50%;
	width: 20px;
	height: 20px;
	background: #f06d6d;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-weight: 600;
	font-size: 12px;
	padding: 4px;
`;

export const Initial = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const FilterBox = styled.div`
	border: 0.5px solid #f2f2f2;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 7px;
	cursor: pointer;
	&:hover {
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
	}
	&.filled {
		background: #393f70;
		svg {
			path {
				stroke: #ffffff;
			}
		}
	}
`;

export const CustomLoader = styled.div`
	margin-top: 4px;
	font-size: 16px;
	font-weight: 500;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	svg {
		color: #ffffff;
	}
`;

export const ChannelsType = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Text = styled.div`
	box-sizing: border-box;
	cursor: pointer;
	color: #828282;
	margin-right: 12px;

	:hover {
		color: #393f70;
		font-weight: 500;
	}
`;

export const PopoverContainer = styled.div`
	display: flex;
	align-items: center;
	background: #393f70;
	border-right: 1px solid #ffffff;
	border-radius: 8px 0px 0px 0px;

	.tippy-box {
		margin-top: -20px !important;
		width: 140px;
	}
`;

export const Line = styled.div`
	width: 100%;
	border: 0.5px solid #393f70;
`;
