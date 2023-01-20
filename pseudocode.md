key parts of the project:
- calculation functions
    * add, subtract, multiply, devide

- look and feel of the calc
    * keys: 10 digs, 4 operations, 1 =, 1 clear, 1 backspace, 1 dot
    * round result with long decimals so that they don’t overflow the screen
    * error message if the user tries to divide by 0
    
- response to  keypress & clicks
    * populate the numbers and operators when pressed
    * clear the display area when C is pressed
    * display result when operator or = is pressed after 1 pair of number is input
    * once result is displayed, only accept operator or =, not number
    * Pressing = before entering all of the numbers or an operator could cause problems!
    * can't input more than 1 dot