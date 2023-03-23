import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, MaxLength, MinLength, Validate } from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check/lib';

export function IsPassword() {
  return applyDecorators(
    IsNotEmpty(),
    MinLength(6),
    MaxLength(20),
    Validate(PasswordValidation, [
      {
        mustContainLowerLetter: true,
        mustContainNumber: true,
        mustContainSpecialCharacter: true,
        mustContainUpperLetter: true,
      },
    ]),
  );
}
