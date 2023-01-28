key parts of the project:
- calculation functions
    * add, subtract, multiply, divide

- look and feel of the calc
    * keys: 10 digs, 4 operations, 1 =, 1 clear, 1 backspace, 1 dot
    * round result with long decimals so that they don’t overflow the screen
    * error message if the user tries to divide by 0
    
- response to  keypress & clicks
    * populate the numbers and operators when pressed
        * show every number in the display when pressed
        * when operator pressed after number, store the number in an input array and show operator sign
        * when 2nd and more operator pressed, 
            * if there are already 2 numbers in input array  
                * result array is empty, do the math and store result in result, clear the queue
                * after result shown:
                    * if user press operator, use that result to do the math with the last num in input array
                    * if user input another num, put at 1st of input array     
        * if one operator is pressed after another, use the last operator
        * do nothing if user press operator first   
        * when only 1 num is input and user press =, ignore it
        * clear the display area when C is pressed
            * lastKeyPressed should be cleared
        * once result is displayed, only accept operator or =, not number
    
    * Pressing = before entering all of the numbers or an operator could cause problems!
    * can't input more than 1 dot