import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
    const saltaGenerated = await genSalt(SALT_RANDOMS);

    await hash(password, saltaGenerated);

    return await hash(password, saltaGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
};
