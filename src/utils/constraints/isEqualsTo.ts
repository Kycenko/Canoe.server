import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsEqualToConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const [relatedPropertyName] = args.constraints
		const relatedValue = (args.object as any)[relatedPropertyName]
		return value === relatedValue // сравниваем значения
	}
}

export function IsEqualTo(
	property: string,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isEqualTo',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: IsEqualToConstraint
		})
	}
}
