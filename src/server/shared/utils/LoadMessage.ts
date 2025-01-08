import * as fs from 'fs';

interface Messages {
    [key: string]: string;
}

const directory = __dirname + '../../../messages/';

const loadMessages = (filePath: string): Messages | null => {
    try {
        const jsonContent: string = fs.readFileSync(filePath, 'utf-8');
        const messages: Messages = JSON.parse(jsonContent);

        return messages;
    } catch (error) {
        console.error('Error loading messages:', error);
        return null;
    }
};

export const getMessage = (
    filePath: string,
    key: string,
    substitutions: { [key: string]: string } = {}
): string | null => {
    const filePathComplete = directory + filePath + '.json';

    const messages: Messages | null = loadMessages(filePathComplete);

    if (messages && messages[key]) {
        let message: string = messages[key];

        for (const substitutionKey in substitutions) {
            message = message.replace(`{${substitutionKey}}`, substitutions[substitutionKey]);
        }

        return message;
    } else {
        console.error(`Key "${key}" not found in messages.`);
        return null;
    }
};
