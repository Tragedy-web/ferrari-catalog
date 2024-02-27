export type TypeInitialState = {
	error: string | null
	user: TypeAuth | null
	isAdmin?: TypeAdminAuth | null
}

export type TypeAuth = {
	email: string
	password: string
	confirmPassword: string
}

export type TypeAdminAuth = {
	isAdmin: string
}
