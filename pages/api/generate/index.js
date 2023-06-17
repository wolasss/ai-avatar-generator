import HuggingFaceApi from '../../../lib/HuggingFaceApi';

if (!process.env.HF_AUTH_KEY) {
  console.error('No HUGGING FACE token key provided');
  process.exit(1);
}

const generateAction = async (req, res) => {
  const input = JSON.parse(req.body).input;
  const normalizedInput = input.replace(/Martyna/g, 'martyna');

  try {
    const image = await HuggingFaceApi.generatePrompt(normalizedInput);

    return res.status(200).json(image);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}

export default generateAction;