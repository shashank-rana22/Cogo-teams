// import { useSelector } from '@cogoport/store';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Check() {
	// const profileName = useSelector(({ profile }) => profile);
	const { data, error } = useSWR(
		'https://api.github.com/repos/vercel/swr',
		fetcher,
	);

	if (error) return 'An error has occurred.';
	if (!data) return 'Loading...';

	// console.log(profileName, 'ff');

	return (
		<div>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<strong>
				👁
				{' '}
				{data.subscribers_count}
			</strong>
			{' '}
			<strong>
				✨
				{' '}
				{data.stargazers_count}
			</strong>
			{' '}
			<strong>
				🍴
				{' '}
				{data.forks_count}
			</strong>
		</div>
	);
}
