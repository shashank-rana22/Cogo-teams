import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 22px;
	min-width: 900px;
	max-width: 900px;
	min-height: 432px;
`;

export const Heading = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 15px;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: #393f70;
`;

export const SearchResults = styled.div`
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.02em;
	margin-bottom: 16px;

	color: #bdbdbd;
	margin-top: 20px;
`;

export const PopoverWrap = styled.div``;

export const SearchItems = styled.div`
	overflow-y: scroll;
	max-height: 200px;
	min-height: 100px;
`;

export const StyledButton = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
`;

export const CancelButton = styled.div`
	display: flex;
	margin-right: 10px;
`;

export const SearchBox = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
`;

export const Text = styled.div`
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #bdbdbd;
	padding-top: 15px;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
`;

export const StyledFeedBack = styled.div``;

export const Content = styled.div``;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const ImportantNote = styled.p`
	margin: 0px;
	margin-bottom: 16px;
`;

export const HowItWorksClick = styled.span`
	color: #5936f0;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;
