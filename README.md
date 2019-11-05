# Clock App
## Author: Richard Coucoules
### Adapted from exercise written by Morten Rand-Hendriksen
### November 1, 2019

 Clock app that mimics functionality of phone apps. Includes digital/analog
   clock, timer, and stopwatch.

 Notes: The clocks on the rendered page increment manually/programmatically
    and are, therefore, prone to desync from the actual time if they run for
    extended periods. This manual incrementation of the clock primarily
    prevents graphical errors in the analog clock during angle reset at the
    12 o'clock position and secondarily prevents desyncing errors between the
    analog and digital clocks. This has been observed in Firefox and is not
    as prevalent in Google Chrome.
