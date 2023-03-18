// import { Button, Input } from '@cogoport/front/components/admin';
// import { IcMPdf, IcMSearchlight } from '@cogoport/icons-react';
// import { React, useState } from 'react';

// import Wallet from '../../../Wallet';

// // import {
// // 	ChooseFromWallet,
// // 	Label,
// // 	UploadWrapper,
// // 	Separator,
// // 	ButtonsContainer,
// // 	StyledButton,
// // 	Header,
// // 	Heading,
// // 	SearchContainer,
// // 	MainContainer,
// // 	Line,
// // } from './styles';
// // import Task from './Task';

// function UploadForm({ show, setShow, refetch }) {
// 	const [searchTask, setSearchTask] = useState('');

// 	const handleDocClick = (doc) => {
// 		setShow({
// 			...show,
// 			url  : doc.image_url,
// 			type : 'task',
// 		});
// 	};
// 	let content = (
// 		<>
// 			<Label>Choose From Document Wallet</Label>
// 			<ChooseFromWallet onClick={() => setShow({ ...show, type: 'wallet' })}>
// 				<div>
// 					<IcMPdf fontSize="2rem" />
// 				</div>
// 				<Label style={{ fontSize: '12px', fontWeight: '600' }}>
// 					Choose a document from the wallet
// 				</Label>
// 			</ChooseFromWallet>
// 			<Separator>OR</Separator>
// 			<StyledButton>
// 				<Button
// 					onClick={() => {
// 						setShow({ ...show, type: 'task' });
// 					}}
// 				>
// 					Manual Upload
// 				</Button>
// 			</StyledButton>
// 			<ButtonsContainer>
// 				<Button
// 					className="secondary md"
// 					onClick={() => {
// 						setShow(null);
// 					}}
// 				>
// 					Cancel
// 				</Button>
// 			</ButtonsContainer>
// 		</>
// 	);
// 	if (show?.type === 'task') {
// 		content = <Task show={show} setShow={setShow} refetch={refetch} />;
// 	}

// 	if (show?.type === 'wallet') {
// 		content = (
// 			<MainContainer className="modal-container">
// 				<Header>
// 					<Heading>Document Wallet</Heading>
// 					<SearchContainer>
// 						<Input
// 							className="primary md"
// 							value={searchTask}
// 							placeholder="Search..."
// 							suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
// 							onChange={(e) => {
// 								setSearchTask(e.target.value);
// 							}}
// 						/>
// 					</SearchContainer>
// 					<Line />
// 				</Header>
// 				<Wallet
// 					showWalletDocs={show.type}
// 					searchTasksVal={searchTask}
// 					show={show}
// 					handleDocClick={handleDocClick}
// 					forModal
// 				/>
// 			</MainContainer>
// 		);
// 	}
// 	return <UploadWrapper>{content}</UploadWrapper>;
// }

// export default UploadForm;
