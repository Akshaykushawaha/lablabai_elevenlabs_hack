from transformers import GPT2Tokenizer, GPT2LMHeadModel

def process_user_input(prompt):
    # Load the tokenizer and model
    tokenizer = GPT2Tokenizer.from_pretrained("trained_model")
    model = GPT2LMHeadModel.from_pretrained("trained_model")
    
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    
    # Generate text
    output = model.generate(input_ids, max_length=100, num_return_sequences=1)
    
    # Decode and print the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text