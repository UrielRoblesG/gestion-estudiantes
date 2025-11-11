import bcrypt from 'bcrypt';

export const hashPassword = async (password = '') => {
    try {
        // Generar un salt
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        throw error;
    }
}

export const compareHashedPassword = async function ( passwordCandidata ) {
    try {
        return await bcrypt.compare(passwordCandidata, this.password);
    } catch(error) {
        throw new Error(error);
    }
}