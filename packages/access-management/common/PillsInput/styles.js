import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& .core-ui-Pills-container {
		all: unset;

		height: 2rem;
		border-radius: 1.5rem;
		overflow: hidden;

		background: #ffffff;
		display: flex;
	}

	& .core-ui-Pills-container > * {
		all: unset;

		cursor: pointer;

		display: flex;
		gap: 2px;

		&:not(:last-child) {
			border-right: 1px solid #333333;
		}
	}

	& .core-ui-Pills-container .active {
		&:not(:last-child) {
			border-right: 1px solid #ffffff;
		}
	}

	& .core-ui-Pills-container .core-ui-tag-root {
		padding: 0 1rem;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	& .core-ui-Pills-container .active .core-ui-tag-root {
		background-color: #333333;
		border: #333333;
	}

	& .core-ui-Pills-container .active .core-ui-tag-root .core-ui-tag-text {
		color: #ffffff;
	}

	& .core-ui-tag-root {
		all: unset;
	}

	& .core-ui-tag-text {
		all: unset;

		font-size: 14px;
		font-weight: 500;
		color: #333333;
	}
`;
