window.InputManager = function(element)
{
    this.element = element;
    var data = [];
    
    var keydown = function(event)
    {
        data[event.keyCode] = true;
    }
    var keyup = function(event)
    {
        data[event.keyCode] = false;
    }
    this.isKeyDown = function(keyCode)
    {
        
        return data[keyCode];
    }
    this.register = function(tool, keyCode)
    {
        console.log(keyCode);
        document.addEventListener("keydown", function(keyCode, event)
        {
            return function(event)
            {
                
            }
        });
        //document.addEventListener("keyup", function(tool, keyCode, event){ if(event.keyCode == keyCode) tool.end(); }.bind(tool, keyCode));
    }
    this.element.addEventListener("keydown", keydown);
    this.element.addEventListener("keyup", keyup);
};