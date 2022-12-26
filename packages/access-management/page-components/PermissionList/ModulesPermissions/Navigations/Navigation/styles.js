import styled from '@cogoport/front/styled';

export const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 18px 35px 18px 18px;
	border-bottom: 1px solid #bdbdbd;
	position: relative;
	&:last-child {
		border-radius: 8px;
		border-bottom: none;
	}

	&.nested {
		padding: 18px 0px 18px 16px;
		border-left: 1px solid #e0e0e0;
		border-radius: 0px;
		border-bottom: 1px solid #e0e0e0;
	}

	@media (max-width: 768px) {
		padding: 8px 16px 8px 8px;

		&.nested {
			padding: 8px 0px 8px 8px;
			border-left: 1px solid #e0e0e0;
			border-radius: 0px;
			border-bottom: 1px solid #e0e0e0;
		}
	}
`;

export const Arrow = styled.div`
	display: none;
	&.nested {
		display: block;
		position: absolute;
		width: 10px;
		height: 1px;
		background: #e0e0e0;
		top: 40%;
		left: 0px;
	}
`;

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;

	&.margin {
		margin-bottom: 10px;
	}

	@media (max-width: 768px) {
		&.actions {
			justify-content: flex-end;
			width: 100%;
		}
	}
`;

export const Name = styled.p`
	margin: 0px;
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;

	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const Description = styled.p`
	margin: 0px;
	font-size: 12px;
	line-height: 14px;
	/* identical to box height */

	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	outline: none;
	background: transparent;
	cursor: pointer;
	border: none;
	padding: 2px 6px;
	border-radius: 4px;
	margin-right: 24px;
	transition: 0.4s;
	&:focus-visible {
		outline: auto blue;
	}
	&:hover {
		background: #f2f2f2;
	}
	&.active {
		transform: rotate(90deg);
	}
`;

export const ActiveText = styled.p`
	margin: 0px;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.04em;
	color: #000000;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	background: #9befa8;
	border-radius: 4px;
	padding: 2px 6px;
	margin-left: 16px;
`;

export const SpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

// export const AnimatedContainer = animated({
// 	enter: {
// 		translateY : [-10, 0],
// 		opacity    : [0, 1],
// 		easing     : 'easeInOutQuad',
// 		duration   : 500,
// 	},
// 	exit: {
// 		translateY : [0, 10],
// 		opacity    : [1, 0],
// 		duration   : 400,
// 	},
// });
