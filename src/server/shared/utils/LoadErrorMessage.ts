import * as fs from 'fs';
import * as path from 'path';
import { AppErrors } from '../enum/ErrorsCodes';
import { ErrorMessage, PathHandleResult } from './types';

const directory = path.join(__dirname, '..', 'messages/');

const pathHandle = (filePath: string): PathHandleResult => {
    const filePathParsed = filePath.split('.');
    const archiveName = filePathParsed[0];
    const errorList = filePathParsed[1];
    return { archiveName, errorList };
};

const loadErrorMessages = (filePath: string): ErrorMessage | null => {
    try {
        const jsonContent: string = fs.readFileSync(filePath, 'utf-8');
        const errorMessages: ErrorMessage = JSON.parse(jsonContent);

        return errorMessages;
    } catch (error) {
        console.error('Error loading error messages:', error);
        return null;
    }
};

export const getErrorMessage = (filePath: string): ((errorCode: AppErrors) => object | null) => {
    const combinedPath = path.join(directory, pathHandle(filePath).archiveName + '.json');

    const errorMessages: ErrorMessage | null = loadErrorMessages(combinedPath);

    const errorList = pathHandle(filePath).errorList;

    return (errorCode: number): object | null => {
        if (errorMessages && errorMessages[errorList]) {
            const errorMessageObject = errorMessages[errorList].find(error => error.code === errorCode);

            if (errorMessageObject) {
                return errorMessageObject;
            } else {
                console.error(`Code "${errorCode}" not found in error messages.`);
                return null;
            }
        } else {
            console.error('Error loading error messages.');
            return null;
        }
    };
};
