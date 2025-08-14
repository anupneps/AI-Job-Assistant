import os
from typing import Optional
import openai

# GPT-2 (local)
from transformers.pipelines import pipeline
from transformers.trainer_utils import set_seed

class TextGenerator:
    def __init__(self, model_name: str = 'gpt-2', openai_api_key: Optional[str] = None):
        self.model_name = model_name
        self.openai_api_key = openai_api_key
        self.generator = None
        if model_name == 'gpt-2':
            try:
                self.generator = pipeline('text-generation', model='gpt-2')
            except Exception as e:
                raise RuntimeError(f'Failed to load GPT-2 pipeline: {e}')
        elif model_name == 'openai':
            if openai_api_key:
                openai.api_key = openai_api_key
            else:
                raise ValueError('OpenAI API key must be provided for OpenAI model.')
        else:
            raise ValueError(f'Unsupported model: {model_name}')

    def generate(self, prompt: str, max_length: int = 300, temperature: float = 0.7) -> str:
        if self.model_name == 'gpt-2':
            set_seed(42)
            if self.generator is None:
                raise RuntimeError('GPT-2 pipeline is not loaded.')
            output = self.generator(prompt, max_length=max_length, num_return_sequences=1, temperature=temperature)
            return output[0]['generated_text']
        elif self.model_name == 'openai':
            response = openai.completions.create(
                model="text-davinci-003",
                prompt=prompt,
                max_tokens=max_length,
                temperature=temperature,
                n=1,
            )
            return response.choices[0].text.strip()
        else:
            raise ValueError(f'Unsupported model: {self.model_name}') 