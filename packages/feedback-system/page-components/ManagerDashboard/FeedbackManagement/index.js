import FilterContent from '@cogo/business-modules/components/filters';
import useGetFilters from '@cogo/business-modules/hooks/useGetFilters';
import { useRouter } from '@cogo/next';
import { Flex, Text } from '@cogoport/front/components';
import { Button, Input } from '@cogoport/front/components/admin';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import UserTableData from '../../../common/userTableData';
import useNewListUserFeedbacks from '../../../hooks/useNewListUserFeedbacks';
import { getControls } from '../../../utils/getUserFilterControls';
import getFeedbackManagementColumns from '../FeedbackManagementColumns';

import {
	Container,
	GoBackContainer,
	TopHeader,
	FilterContainer,
	RedirectContainer,
} from './styles';

function FeedbackManagement() {
	const [searchValue, setSearchValue] = useState('');
	const [openFilter, setOpenFilter] = useState(false);

	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-manager-dashboard');
	};

	const filterControls = getControls();
	const filterProps = useGetFilters({ controls: filterControls || [] });

	const { data, loading, setFilters, getTeamFeedbackList } =		useNewListUserFeedbacks({
		searchValue,
		activeTab: 'feedback_management',
	});

	const feedbackManagementColumns = getFeedbackManagementColumns({
		getTeamFeedbackList,
	});

	const { list: newTeamList = [] } = data || {};

	const {
		fields,
		filters,
		applyFilters,
		reset: resetFilters,
		getValues,
	} = filterProps || {};

	const finalFilters = getValues();

	useEffect(() => {
		setFilters(() => ({
			...finalFilters,
		}));
	}, [filters]);

	const handleChange = (e) => {
		setSearchValue(e?.target?.value);
	};

	const onClickOutside = () => {
		setOpenFilter(false);
	};

	return (
		<Container>
			<RedirectContainer>
				<GoBackContainer
					type="button"
					onClick={() => {
						handleClick();
					}}
				>
					<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					<Text size={18} style={{ fontWeight: '500' }}>
						Go Back
					</Text>
				</GoBackContainer>
			</RedirectContainer>

			<TopHeader>
				<Text size={18} style={{ fontWeight: '500' }} color="#393f70">
					Feedback Management
				</Text>

				<Flex justifyContent="flex-end" alignItems="center">
					{' '}
					<div style={{ marginRight: '16px' }}>
						<Input
							size="lg"
							value={searchValue}
							onChange={(e) => handleChange(e)}
							placeholder="Search by Name"
							prefix={<IcMSearchlight style={{ marginTop: '6px' }} />}
							type="text"
						/>
					</div>
					<FilterContainer>
						<FilterContent
							fields={fields}
							applyFilters={applyFilters}
							reset={() => resetFilters()}
							controls={filterControls}
							setOpen={setOpenFilter}
							open={openFilter}
							isScrollable={false}
							onClickOutside={onClickOutside}
						>
							<Button
								className="primary md"
								onClick={() => setOpenFilter(!openFilter)}
							>
								Filters
							</Button>
						</FilterContent>
					</FilterContainer>
				</Flex>
			</TopHeader>

			<UserTableData
				columns={feedbackManagementColumns}
				list={newTeamList}
				loading={loading}
			/>
		</Container>
	);
}

export default FeedbackManagement;
