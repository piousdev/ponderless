export const getPasswordStrength = (password: string) => {
	if (!password) return 0;
	let strength = 0;
	if (password.length >= 8) strength++;
	if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
	if (password.match(/[0-9]/)) strength++;
	if (password.match(/[^a-zA-Z0-9]/)) strength++;
	return strength;
};
