import speech_recognition as sr
from pydub import AudioSegment

def recognize_audio_file():
    # Read the audio file using pydub
    audio_file_path = "./recording.wav"
    audio = AudioSegment.from_file(audio_file_path, format="mp3")  # Adjust the format if necessary

    # Initialize the recognizer
    recognizer = sr.Recognizer()

    # Convert pydub audio to speech_recognition audio data
    audio_data = sr.AudioData(audio.raw_data, frame_rate=audio.frame_rate, sample_width=audio.sample_width)

    try:
        # Use Google Web Speech API to recognize the audio data
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        print("Google Web Speech API could not understand the audio.")
    except sr.RequestError as e:
        print("Could not request results from Google Web Speech API; {0}".format(e))

    return None
