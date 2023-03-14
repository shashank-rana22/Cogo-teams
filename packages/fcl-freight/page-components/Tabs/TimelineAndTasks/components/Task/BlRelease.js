// import React from 'react';
// import { Modal } from '@cogo/deprecated_legacy/ui';
// import { shape, bool, func, string, arrayOf } from 'prop-types';
// import { Skeleton } from '@cogoport/front/components/admin';
// import { Container } from './styles';
// import Card from './Card';

// const BLRelease = ({
// 	show,
// 	onClose,
// 	type,
// 	getDocs,
// 	bl_data,
// 	isLoading,
// 	viewAs,
// 	isModal,
// }) => {
// 	const renderContent = (
// 		<div>
// 			{isLoading ? (
// 				<>
// 					<Skeleton width="100%" height="40px" margin="10px 0px" />
// 					<Skeleton width="100%" height="40px" margin="10px 0px" />
// 					<Skeleton width="100%" height="40px" margin="10px 0px" />
// 				</>
// 			) : (
// 				<Container>
// 					{bl_data.map((item) => (
// 						<Card
// 							bl_data={item}
// 							type={type}
// 							theme={bl_data.length <= 1 ? 'borderless' : ''}
// 							onClose={bl_data.length <= 1 ? onClose : null}
// 							getDocs={getDocs}
// 							viewAs={viewAs}
// 						/>
// 					))}
// 				</Container>
// 			)}
// 		</div>
// 	);
// 	return isModal ? (
// 		<Modal show={show} onClose={onClose}>
// 			{renderContent}
// 		</Modal>
// 	) : (
// 		renderContent
// 	);
// };

// BLRelease.propTypes = {
// 	show: bool,
// 	onClose: func,
// 	type: string.isRequired,
// 	getDocs: func,
// 	bl_data: arrayOf(shape({})),
// 	isLoading: bool,
// 	viewAs: string.isRequired,
// 	isModal: bool,
// };

// BLRelease.defaultProps = {
// 	show: false,
// 	onClose: () => {},
// 	getDocs: () => {},
// 	bl_data: [],
// 	isLoading: true,
// 	isModal: true,
// };

// export default BLRelease;
