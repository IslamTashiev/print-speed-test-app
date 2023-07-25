function getRandomElement<T>(arr: T[]): T | undefined {
	if (arr.length === 0) {
		return undefined;
	}

	const randomIndex: number = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

export default getRandomElement;
