import AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager({
    region: 'ap-south-1'
});

export async function getSecrets(secretName) {
    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        if (data.SecretString) {
            return JSON.parse(data.SecretString);
        } else {
            throw new Error('SecretString is empty');
        }
    } catch (error) {
        console.error('Error retrieving secrets:', error);
        throw error;
    }
}
