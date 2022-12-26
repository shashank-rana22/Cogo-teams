import React from 'react';
import {
	Container,
	Content,
	Arrows,
	CaretLeftContainer,
	CaretRightContainer,
} from './styles';
import CaretRightBlackSvg from './caret-right-black.svg';

const Pagination = ({ listAuthRolesApi = {}, onChangeParams = () => {} }) => {
	const { loading = false, data = {} } = listAuthRolesApi;
	const {
		list: roleListData = [],
		page = 0,
		page_limit: pageLimit = 0,
		total: totalPage = 0,
		total_count: totalCount = 0,
	} = data;

	if (!loading && roleListData.length === 0) return null;

	const topCount = Math.max((page - 1) * pageLimit + 1, 0);
	const lastCount = totalPage !== page ? page * pageLimit : totalCount;

	return (
		<Container id="rnp_role_list_pagination_container">
			<Content id="rnp_role_list_pagination_content">
				{+totalPage === 0
					? 'Row 0 - 0 of 0'
					: `Row ${topCount} - ${lastCount} of ${totalCount}`}
			</Content>

			<Arrows id="rnp_role_list_pagination_arrows">
				<CaretLeftContainer
					id="rnp_role_list_pagination_left_arrow_container"
					onClick={() => onChangeParams({ page: page > 1 ? page - 1 : 1 })}
					disabled={loading || !(page > 1 || totalCount === 0)}
				>
					<CaretRightBlackSvg id="rnp_role_list_pagination_left_arrow" />
				</CaretLeftContainer>

				<CaretRightContainer
					id="rnp_role_list_pagination_right_arrow_container"
					onClick={() =>
						onChangeParams({ page: page < totalPage ? page + 1 : totalPage })
					}
					disabled={loading || !(page < totalPage || totalPage === 0)}
				>
					<CaretRightBlackSvg id="rnp_role_list_pagination_right_arrow" />
				</CaretRightContainer>
			</Arrows>
		</Container>
	);
};

export default Pagination;
