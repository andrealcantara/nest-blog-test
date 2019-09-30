import { PipeTransform, BadRequestException, ArgumentMetadata } from "@nestjs/common";
import * as mongoose from 'mongoose';



export class ValidateObjectId implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if(!isValid) throw new BadRequestException("Invalid ID");
        return isValid;
    }
}