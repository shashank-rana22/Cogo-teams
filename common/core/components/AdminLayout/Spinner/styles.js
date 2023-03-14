import styled from '@cogoport/front/styled';

export const DIV = styled.div`
	border: ${(props) => `${props.borderWidth || 2}px solid ${props.outerBorderColor || '#FEF1DF'}`};
	border-radius: 50%;
	border-top: ${(props) => `${props.borderWidth || 2}px solid ${props.spinBorderColor || '#FBD69F'}`};
	width: ${(props) => `${props.size || 10}px`};
	height: ${(props) => `${props.size || 10}px`};
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
