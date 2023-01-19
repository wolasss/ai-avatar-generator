import { bufferToBase64 } from '../utils';

export default {
    async generatePrompt(inputs) {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/wolas/buildpsace-avatars',
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    options: {
                        wait_for_model: true
                    },
                    inputs
                }),
            }
        );

        if (response.ok) {
            const buffer = await response.arrayBuffer();
            const base64 = bufferToBase64(buffer);
            
            return { image: base64 };
        } else {
            console.log('res', response);
            throw new Error(response.statusText);
        }
    }
}