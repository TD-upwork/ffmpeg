Task

1) Split audio file into multiple clips

2) Find a way to omit parts of the audio file when nobody is speaking for a duration of 3 seconds

Trim audio into clips:

ffmpeg -i youtube.mp3 -c:v libx264 -ss 00:00:00 -t 11 output.mp3

Remove Silence:

ffmpeg -i youtube.mp3 -af silenceremove=stop_periods=-1:stop_duration=2:stop_threshold=-90dB output2.wav


ffmpeg -ss 00:00:10 -to 00:00:20 -i youtube.mp3 -c copy output5.mp3


