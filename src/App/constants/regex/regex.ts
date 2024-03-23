export const EmailChecker =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const onTypingCarBrand = /^[a-zA-Z]{3,15}$/
export const onTypingCarPrice = /^[0-9]*$/

export const onEditCarBrand = onTypingCarBrand
export const onEditCarPrice = onTypingCarPrice