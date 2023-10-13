import { Pagination, Placeholder } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

function ViewSuggestedServices({
	listview,
	page = {},
	setPage = () => {},
	loading,
	handleAddRate,
	setShowPopover,
}) {
	let content = (
		<div>
			<div
				style={{
					display        : 'flex',
					justifyContent : 'center',
					fontSize       : '14px',
					padding        : '2px',
					fontWeight     : '400',
					color          : 'black',
				}}
			>
				SUGGESTED SERVICE PROVIDERS
			</div>
			<div
				style={{
					display        : 'flex',
					flexDirection  : 'column',
					justifyContent : 'center',
				}}
			>
				{[...Array(6)].map((i) => (
					<div
						key={i}
						style={{
							margin       : '2px 0px 4px 4px',
							padding      : '6px',
							border       : '0.5px solid black',
							borderRadius : '4px',
						}}
					>
						<Placeholder style={{ borderRadius: '4px' }} width="100%" />
					</div>
				))}
				<div />
			</div>
		</div>
	);

	if ((listview?.list || []).length && !loading) {
		content = (
			<>
				<div
					style={{
						display        : 'flex',
						justifyContent : 'center',
						fontSize       : '14px',
						padding        : '2px',
						fontWeight     : '400',
						color          : 'black',
					}}
				>
					SUGGESTED SERVICE PROVIDERS
				</div>
				{listview?.list.map((listItem) => (
					<div key={listItem?.id}>
						<div
							style={{
								margin       : '2px 0px 4px 4px',
								fontSize     : '10px',
								padding      : '6px',
								fontWeight   : '500',
								color        : '#373f6f',
								textOverflow : 'ellipsis',
								whiteSpace   : 'nowrap',
								overflow     : 'hidden',
								boxShadow    : '0px 0px 2px rgba(44, 62, 80, 0.75)',
								border       : '0.5px solid black',
								borderRadius : '4px',
								cursor       : 'pointer',
							}}
							role="presentation"
							onClick={() => {
								setShowPopover(false);
								handleAddRate(listItem?.id);
							}}
						>
							{listItem?.business_name}
						</div>
					</div>
				))}
			</>
		);
	}

	if (!(listview?.list || []).length && !loading) {
		content = (
			<div>
				<div>
					<div
						style={{
							marginLeft : '4px',
							fontWeight : '600',
							fontFamily : 'Poppins',
							color      : '#373f6f',
							fontSize   : '12px',
						}}
					>
						NO SERVICE PROVIDER FOUND
					</div>
					<div
						style={{
							display    : 'flex',
							fontSize   : '10px',
							marginLeft : '4px',
						}}
					>
						Please apply for service expertise
					</div>
				</div>
				<div
					style={{
						display        : 'flex',
						justifyContent : 'flex-end',
						marginTop      : '-7%',
					}}
				>
					<IcMSearchlight width="30px" height="30px" />
				</div>
			</div>
		);
	}
	return (
		<div>
			<div
				style={{
					display       : 'flex',
					flexDirection : 'column',
					padding       : '10px',
				}}
			>
				{content}
				{listview?.total_count > 10 && (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={listview?.total_count}
						pageSize={listview?.page_limit}
						onPageChange={setPage}
					/>

				)}
			</div>
		</div>
	);
}

export default ViewSuggestedServices;
