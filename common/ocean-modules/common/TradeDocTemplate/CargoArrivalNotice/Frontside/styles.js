import styled from '@cogoport/front/styled';
import Flex from '@cogoport/front/components/Flex';

export const Page = styled.div`
	width: 794px;
	max-width: 794px;
	min-height: 1350px;
	max-height: 1850px;
	background-color: #ffffff;
	padding: 48px;
	position: relative;
	flex-shrink: 0;
	margin-bottom: 16px;

	.trade-doc-inner-page {
		border: 1px #333 solid;
		position: relative;
		min-height: 580px;

		display: flex;
		flex-direction: column;

		/* &.no-format {
			border: 1px transparent solid;

			.hidden-no-format {
				visibility: hidden;
			}

			.borderless-no-format {
				border: 1px transparent solid !important;
			}

			.ui-table {
				.ui-table-head-cell {
					visibility: hidden;
				}
			}
		} */
	}
	.company-details {
		text-align: center;
		font-size: 20px;
	}

	.trade-doc-bordered {
		border: 1px #333 solid;
	}
`;

export const Block = styled(Flex)`
	border: 1px #333 solid;
	padding: 4px;
`;
