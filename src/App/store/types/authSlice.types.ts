export type TypeInitialState = {
	error: string | null
	user: TypeAuth | null
}

export type TypeAuth = {
	email: string
	password: string
	confirmPassword: string
}
