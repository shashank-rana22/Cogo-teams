import { setDoc, doc } from 'firebase/firestore';

const updateRoom = ({ agentId = '', firestore = {} }) => {
	const docRef = doc(firestore, `/users/${agentId}`);

	setDoc(
		docRef,
		{
			feedback_form_status: 'done',
		},
		{ merge: true },
	);
};

export { updateRoom };
