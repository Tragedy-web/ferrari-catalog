export type TypeInitialState = {
	user: TypeAuth | null
	isAdmin: boolean
}

export type TypeAuth = {
	email: string
	password: string
	confirmPassword: string
}